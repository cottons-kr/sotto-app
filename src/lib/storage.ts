abstract class StorageClient {
	abstract get(key: string): Promise<string | null>;
	abstract set(key: string, value: string): Promise<void>;
	abstract remove(key: string): Promise<void>;
	abstract clear(): Promise<void>;
}

class LocalStorageClient extends StorageClient {
	constructor() {
		super();
		console.log('Using LocalStorageClient');
	}

	async get(key: string) {
		return localStorage.getItem(key);
	}

	async set(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	async remove(key: string) {
		localStorage.removeItem(key);
	}

	async clear() {
		localStorage.clear();
	}
}

class StrongholdStorageClient extends StorageClient {
	private stronghold: unknown;
	private client: unknown;

	constructor() {
		super();
		console.log('Using StrongholdStorageClient');
	}

	async init() {
    
  }

	async create() {
		const instance = new StrongholdStorageClient();
		await instance.init();
		return instance;
	}

	async get(key: string) {}
}

export const storageClient: StorageClient = import.meta.env.PROD
	? await new StrongholdStorageClient().create()
	: new LocalStorageClient();
