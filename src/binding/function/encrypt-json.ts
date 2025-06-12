import { invoke } from '@tauri-apps/api/core';

/**
 * ```rust
 * BASE64_STANDARD.encode(&encrypted_data)
 * BASE64_STANDARD.encode(&aes_key)
 * BASE64_STANDARD.encode(&nonce_bytes)
 * ```
 */
type EncryptResult = [string, string, string];

export async function encryptJson(data: string | object, prevAesKey?: string) {
	const json = typeof data === 'string' ? data : JSON.stringify(data);

	const result = await invoke<EncryptResult>('encrypt_json', {
		json,
		prevAesKey,
	});

	return result;
}
