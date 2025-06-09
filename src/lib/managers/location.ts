import { v4 } from 'uuid';
import { storageClient } from './storage';

export interface Location {
	uuid: string;
	name?: string;
	address: string;
}

export type LocationPresetKey = 'home' | 'secondHome' | 'school' | 'work';

type PresetLocationAlias = {
	[key in LocationPresetKey]: string | null;
};

class LocationManager {
	private presets: PresetLocationAlias = {
		home: null,
		secondHome: null,
		school: null,
		work: null,
	};
	private history: Map<string, Location> = new Map();
	public isInitialized = false;

	async init() {
		const savedPresets = await storageClient.get('location-presets');
		const savedHistory = await storageClient.get('location-history');
		if (savedPresets) {
			const parsedPresets = JSON.parse(savedPresets);
			this.presets = parsedPresets;
		}
		if (savedHistory) {
			const parsedHistory = JSON.parse(savedHistory);
			this.history = new Map<string, Location>(Object.entries(parsedHistory));
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
		await storageClient.set(
			'location-history',
			JSON.stringify(Object.fromEntries(this.history)),
		);
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

	getHistory() {
		return Array.from(this.history.values());
	}

	async addHistory(location: Location | string) {
		this.checkInitialized();
		if (typeof location === 'string') {
			const uuid = v4();
			this.history.set(uuid, {
				uuid,
				address: location,
			});
		} else {
			this.history.set(location.uuid, location);
		}
		await this.saveData();
	}
}

export const locationManager = new LocationManager();
