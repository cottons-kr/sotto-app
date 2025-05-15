import { appDataDir } from '@tauri-apps/api/path';
import { BaseDirectory, remove } from '@tauri-apps/plugin-fs';
import {
	type Client,
	type Store,
	Stronghold,
} from '@tauri-apps/plugin-stronghold';

abstract class StorageClient {
	public isInitialized = false;

	abstract init(password: string): Promise<void>;
	abstract get(key: string): Promise<string | null>;
	abstract set(key: string, value: string): Promise<void>;
	abstract remove(key: string): Promise<void>;
	abstract clear(): Promise<StorageClient>;
}

class LocalStorageClient extends StorageClient {
	constructor() {
		super();
		console.warn('Using LocalStorageClient');
	}

	async init() {
		console.log('LocalStorageClient does not require initialization');
		this.isInitialized = true;
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
		return new LocalStorageClient();
	}
}

class StrongholdStorageClient extends StorageClient {
	private stronghold?: Stronghold;
	private client?: Client;
	private store?: Store;

	constructor() {
		super();
		console.log('Using StrongholdStorageClient');
	}

	async init(password: string) {
		const vaultPath = `${await appDataDir()}/vault.hold`;
		this.stronghold = await Stronghold.load(vaultPath, password);

		try {
			this.client = await this.stronghold.loadClient('sotto_client');
		} catch {
			this.client = await this.stronghold.createClient('sotto_client');
		}

		this.store = this.client.getStore();
		this.isInitialized = true;
	}

	private checkInitialized() {
		if (!this.client || !this.stronghold || !this.store) {
			throw new Error(
				'Stronghold client is not initialized. Please call init() first.',
			);
		}
	}

	async get(key: string) {
		this.checkInitialized();
		const value = (await this.store?.get(key)) || null;
		return value ? new TextDecoder().decode(value) : null;
	}

	async set(key: string, value: string) {
		this.checkInitialized();
		const encodedValue = Array.from(new TextEncoder().encode(value));
		await this.store?.insert(key, encodedValue);
		await this.stronghold?.save();
	}

	async remove(key: string) {
		this.checkInitialized();
		await this.store?.remove(key);
		await this.stronghold?.save();
	}

	/**
	 * You have to reinitialize the Stronghold client after clearing it.
	 * @returns A new instance of StrongholdStorageClient
	 */
	async clear() {
		this.checkInitialized();
		await this.stronghold?.unload();
		await remove('vault.hold', {
			baseDir: BaseDirectory.AppData,
		});
		const instance = new StrongholdStorageClient();
		return instance;
	}
}

export const storageClient: StorageClient = import.meta.env.PROD
	? new StrongholdStorageClient()
	: new LocalStorageClient();
