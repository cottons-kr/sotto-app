import { invoke } from '@tauri-apps/api/core';

/**
 * ```rust
 * BASE64_STANDARD.encode(&encrypted_data)
 * BASE64_STANDARD.encode(&aes_key)
 * BASE64_STANDARD.encode(&nonce_bytes)
 * ```
 */
type EncryptDiaryResult = [string, string, string];

export async function encryptDiary(diary: DiaryData, prevAesKey?: string) {
	const result = await invoke<EncryptDiaryResult>('encrypt_diary', {
		diary,
		prevAesKey,
	});

	return result;
}
