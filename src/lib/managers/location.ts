import { v4 } from 'uuid';
import { storageClient } from './storage';

export interface Location {
	uuid: string;
	name?: string;
	address: string;
	createdAt: Date;
	updatedAt: Date;
}

export type LocationPresetKey = 'home' | 'secondHome' | 'school' | 'work';

type PresetLocationAlias = {
	[key in LocationPresetKey]: string | null;
};

export const MAX_ALIAS_COUNT = 50;
export const MAX_HISTORY_COUNT = 50;

class LocationManager {
	private presets: PresetLocationAlias = {
		home: null,
		secondHome: null,
		school: null,
		work: null,
	};
	private aliases: Array<Location> = [];
	private history: Array<Location> = [];
	public isInitialized = false;

	async init() {
		const savedPresets = await storageClient.get('location-presets');
		const savedAliases = await storageClient.get('location-aliases');
		const savedHistory = await storageClient.get('location-history');
		if (savedPresets) {
			const parsedPresets = JSON.parse(savedPresets);
			this.presets = parsedPresets;
		}
		if (savedAliases) {
			this.aliases = JSON.parse(savedAliases);
		}
		if (savedHistory) {
			this.history = JSON.parse(savedHistory);
		}
		this.isInitialized = true;
	}

	private checkInitialized() {
		if (!this.isInitialized) {
			throw new Error('LocationManager is not initialized. Call init() first.');
		}
	}

	private async saveData() {
		this.checkInitialized();
		await storageClient.set('location-presets', JSON.stringify(this.presets));
		await storageClient.set('location-aliases', JSON.stringify(this.aliases));
		await storageClient.set(
			'location-history',
			JSON.stringify(Array.from(this.history.values())),
		);
	}

	getSavedCount() {
		const presetCount = Object.values(this.presets).filter(
			(value) => value !== null,
		).length;
		const aliasCount = this.aliases.length;
		return presetCount + aliasCount;
	}

	getPresets() {
		return this.presets;
	}

	getPresetName(key: LocationPresetKey) {
		switch (key) {
			case 'home':
				return 'Home';
			case 'secondHome':
				return 'Home 2';
			case 'school':
				return 'School';
			case 'work':
				return 'Work';
			default:
				return key;
		}
	}

	async setPreset(name: LocationPresetKey, address: string) {
		this.checkInitialized();
		this.presets[name] = address;
		await this.saveData();
	}

	async resetPreset(name: LocationPresetKey) {
		this.checkInitialized();
		this.presets[name] = null;
		await this.saveData();
	}

	getAliases() {
		return Array.from(this.aliases.values());
	}

	getAlias(uuid: string) {
		return Array.from(this.aliases).find((alias) => alias.uuid === uuid);
	}

	async addAlias(name: string, address: string) {
		this.checkInitialized();
		if (!name || !address) {
			throw new Error('Name and address must be provided.');
		}
		const uuid = v4();
		const newAlias = {
			uuid,
			name,
			address,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		if (this.aliases.some((alias) => alias.uuid === uuid)) {
			throw new Error('Alias with this UUID already exists.');
		}
		this.aliases.push(newAlias);
		await this.saveData();
		return newAlias;
	}

	async updateAlias(uuid: string, location: Partial<Location>) {
		this.checkInitialized();
		const alias = this.getAlias(uuid);
		if (!alias) {
			throw new Error('Alias not found.');
		}
		const updatedAlias = {
			...alias,
			...location,
			updatedAt: new Date(),
		};
		const index = this.aliases.findIndex((a) => a.uuid === uuid);
		if (index === -1) {
			throw new Error('Alias not found.');
		}
		this.aliases[index] = updatedAlias;
		await this.saveData();
		return updatedAlias;
	}

	async deleteAlias(uuid: string) {
		this.checkInitialized();
		this.aliases = this.aliases.filter((alias) => alias.uuid !== uuid);
		await this.saveData();
	}

	getHistory() {
		return Array.from(this.history.values());
	}

	async addHistory(location: Location | string) {
		this.checkInitialized();
		if (typeof location === 'string') {
			const uuid = v4();
			this.history.push({
				uuid,
				address: location,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		} else {
			this.history.push(location);
		}
		await this.saveData();
	}
}

export const locationManager = new LocationManager();
