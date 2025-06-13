export interface FileMetadata {
	name: string;
	type: string;
	lastModified: number;
	size: number;
}

export interface StoredFileData {
	metadata: FileMetadata;
	blob: Blob;
}

class FileStorage {
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

	private getDatabase() {
		if (!this.db) {
			throw new Error('Database is not initialized. Call init() first.');
		}
		return this.db;
	}

	async init() {
		const openReq = indexedDB.open(this.dbName, this.version);

		openReq.onupgradeneeded = () => {
			const database = openReq.result;
			if (!database.objectStoreNames.contains(this.storeName)) {
				database.createObjectStore(this.storeName);
			}
		};

		this.db = await this.openRequest(openReq);
	}

	private transaction(mode: IDBTransactionMode) {
		const database = this.getDatabase();
		const tx = database.transaction(this.storeName, mode);
		return tx.objectStore(this.storeName);
	}

	async saveFile(key: string, file: File) {
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

	async getFile(key: string) {
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

	async listFiles() {
		const store = this.transaction('readonly');
		const [keys, values] = await Promise.all([
			this.openRequest<IDBValidKey[]>(store.getAllKeys()),
			this.openRequest<StoredFileData[]>(store.getAll()),
		]);

		return values.map((data, index) => ({
			key: String(keys[index]),
			metadata: data.metadata,
		}));
	}

	async deleteFile(key: string) {
		const store = this.transaction('readwrite');
		await this.openRequest(store.delete(key));
	}

	async clear() {
		const store = this.transaction('readwrite');
		await this.openRequest(store.clear());
	}
}

export const fileStorage = new FileStorage('Sotto', 'attachments', 1);
