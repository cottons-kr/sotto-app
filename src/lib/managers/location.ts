import { storageClient } from './storage';

export interface Location {
	uuid: string;
	name?: string;
	address: string;
}

class LocationManager {
	private presets: Map<string, Location> = new Map();
	private history: Map<string, Location> = new Map();
	public isInitialized = false;

	async init() {
		const savedPresets = await storageClient.get('location-presets');
		const savedHistory = await storageClient.get('location-history');
		if (savedPresets) {
			const parsedPresets = JSON.parse(savedPresets);
			this.presets = new Map<string, Location>(Object.entries(parsedPresets));
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
}

export const locationManager = new LocationManager();
