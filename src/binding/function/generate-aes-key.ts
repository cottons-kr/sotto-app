import { invoke } from '@tauri-apps/api/core';

export async function generateAesKey() {
	const result = await invoke<string>('generate_aes_key');

	return result;
}
