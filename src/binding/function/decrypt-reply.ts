import { invoke } from '@tauri-apps/api/core';

export async function decryptReply(
	privateKey: string,
	encryptedData: string,
	encryptedKey: string,
	nonce: string,
) {
	const result = await invoke<ReplyData>('decrypt_reply', {
		privateKeyPem: privateKey,
		encryptedDataB64: encryptedData,
		encryptedKeyB64: encryptedKey,
		nonceB64: nonce,
	});

	return result;
}
