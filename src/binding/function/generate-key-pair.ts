import { invoke } from '@tauri-apps/api/core';

export async function generateKeyPair() {
	const [privateKeyPem, publicKeyPem] =
		await invoke<[string, string]>('generate_key_pair');

	return {
		privateKeyPem,
		publicKeyPem,
	};
}
