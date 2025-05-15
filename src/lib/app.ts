import { wait } from './common';
import { diaryManager } from './managers/diary';
import { storageClient } from './managers/storage';

export async function processSignIn(pin: string) {
	await storageClient.init(pin);
	await diaryManager.init();
	await wait(500);
}
