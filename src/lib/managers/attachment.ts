import { decryptData } from '@/binding/function/decrypt-data';
import { encryptData } from '@/binding/function/encrypt-data';
import { convertFileToBase64 } from '../common';
import { apiClient } from './http';
import { storageClient } from './storage';

export async function uploadAttachment(file: File, aesKey: string) {
	const base64File = await convertFileToBase64(file);

	const [encryptedData, , nonce] = await encryptData(base64File, aesKey);
	const filePayload = {
		data: encryptedData,
		nonce,
	};

	const { url: presignedUrl, fileName } =
		await apiClient.get<PresignedUrlResponse>('/attachments/presigned-url');

	await window.fetch(presignedUrl, {
		method: 'PUT',
		body: JSON.stringify(filePayload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const fileUrl = await apiClient.get<string>(
		`/attachments/object-url?fileName=${fileName}`,
	);

	return {
		fileName,
		fileUrl,
	};
}

export async function decryptAttachment(fileUrl: string, aesKey: string) {
	const res = await window.fetch(fileUrl);
	if (!res.ok) {
		throw new Error('Failed to fetch attachment');
	}

	const privateKey = await storageClient.get('privateKey');
	if (!privateKey) {
		throw new Error('Private key not found');
	}

	const attachment: AttachmentResponse = await res.json();
	const { data: encryptData, nonce } = attachment;

	const data = await decryptData(privateKey, encryptData, aesKey, nonce);
	return data;
}
