import { invoke } from '@tauri-apps/api/core';

export async function decryptDiary(
	privateKey: string,
	encryptedData: string,
	encryptedKey: string,
	nonce: string,
) {
	const result = await invoke<DiaryData>('decrypt_diary', {
		privateKeyPem: privateKey,
		encryptedDataB64: encryptedData,
		encryptedKeyB64: encryptedKey,
		nonceB64: nonce,
	});

	return result;
}
