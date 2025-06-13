import { message } from '@tauri-apps/plugin-dialog';
import { wait } from './common';
import { log } from './log';
import { diaryManager } from './managers/diary';
import { fileStorage } from './managers/file';
import { friendManager } from './managers/friend';
import { apiClient } from './managers/http';
import { locationManager } from './managers/location';
import { storageClient } from './managers/storage';

export async function processSignIn(pin: string) {
	await storageClient.init(pin);
	await diaryManager.init();
	await locationManager.init();
	await fileStorage.init();
	await wait(500);
}

export async function resetApp() {
	try {
		friendManager.clear();
		await diaryManager.clear();
		await fileStorage.clear();
		await apiClient.delete('/users/me');
		await storageClient.clear();
	} catch (error) {
		await message(
			'Failed to delete all diaries and log out. Please try again.',
		);
		log('error', 'Failed to delete all diaries and log out', error);
		throw error;
	}
}
