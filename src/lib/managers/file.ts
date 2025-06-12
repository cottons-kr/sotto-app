interface FileMetadata {
	name: string;
	type: string;
	lastModified: number;
	size: number;
}

interface StoredFileData {
	metadata: FileMetadata;
	blob: Blob;
}

export class FileStorage {
	private db: IDBDatabase | null = null;

	constructor(
		private readonly dbName: string = 'FileStorage',
		private readonly storeName: string = 'files',
		private readonly version: number = 1,
	) {}

	private openRequest<T>(request: IDBRequest<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	private getDatabase(): IDBDatabase {
		if (!this.db) {
			throw new Error('Database is not initialized. Call init() first.');
		}
		return this.db;
	}

	async init(): Promise<void> {
		const request = indexedDB.open(this.dbName, this.version);

		request.onupgradeneeded = (event) => {
			const database = (event.target as IDBOpenDBRequest).result;
			if (!database.objectStoreNames.contains(this.storeName)) {
				database.createObjectStore(this.storeName);
			}
		};

		this.db = await this.openRequest(request);
	}

	private transaction(mode: IDBTransactionMode): IDBObjectStore {
		const database = this.getDatabase();
		const tx = database.transaction(this.storeName, mode);
		return tx.objectStore(this.storeName);
	}

	async saveFile(key: string, file: File): Promise<void> {
		const store = this.transaction('readwrite');
		const data: StoredFileData = {
			metadata: {
				name: file.name,
				type: file.type,
				lastModified: file.lastModified,
				size: file.size,
			},
			blob: file,
		};
		await this.openRequest(store.put(data, key));
	}

	async getFile(key: string): Promise<File | null> {
		const store = this.transaction('readonly');
		const result = await this.openRequest<StoredFileData | undefined>(
			store.get(key),
		);
		if (!result) {
			return null;
		}

		const { metadata, blob } = result;
		return new File([blob], metadata.name, {
			type: metadata.type,
			lastModified: metadata.lastModified,
		});
	}

	async listFiles(): Promise<Array<{ key: string; metadata: FileMetadata }>> {
		const store = this.transaction('readonly');
		return new Promise((resolve, reject) => {
			const files: Array<{ key: string; metadata: FileMetadata }> = [];
			const request = store.openCursor();

			request.onsuccess = (event) => {
				const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
				if (cursor) {
					const data = cursor.value as StoredFileData;
					files.push({ key: cursor.key.toString(), metadata: data.metadata });
					cursor.continue();
				} else {
					resolve(files);
				}
			};

			request.onerror = () => reject(request.error);
		});
	}

	async deleteFile(key: string): Promise<void> {
		const store = this.transaction('readwrite');
		await this.openRequest(store.delete(key));
	}

	async clearAll(): Promise<void> {
		const store = this.transaction('readwrite');
		await this.openRequest(store.clear());
	}
}

export const fileStorage = new FileStorage('Sotto', 'attachments', 1);
