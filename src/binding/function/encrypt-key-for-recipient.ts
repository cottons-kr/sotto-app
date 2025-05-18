import { invoke } from '@tauri-apps/api/core';

/**
 * @param publicKey
 * @param aesKey
 * @returns The encrypted AES key (Base64)
 */
export async function encryptKeyForRecipient(
	publicKey: string,
	aesKey: string,
) {
	const result = await invoke<string>('encrypt_key_for_recipient', {
		publicKeyPem: publicKey,
		aesKey,
	});

	return result;
}
