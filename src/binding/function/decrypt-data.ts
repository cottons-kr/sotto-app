import { invoke } from '@tauri-apps/api/core';

export async function decryptData(
	privateKey: string,
	encryptedData: string,
	encryptedKey: string,
	nonce: string,
) {
	const result = await invoke<string>('decrypt_data', {
		privateKeyPem: privateKey,
		encryptedDataB64: encryptedData,
		encryptedKeyB64: encryptedKey,
		nonceB64: nonce,
	});

	return result;
}
