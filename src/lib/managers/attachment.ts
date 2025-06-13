import { decryptData } from '@/binding/function/decrypt-data';
import { encryptData } from '@/binding/function/encrypt-data';
import { convertFileToBase64 } from '../common';
import { log } from '../log';
import { fileStorage } from './file';
import { apiClient } from './http';
import { storageClient } from './storage';

export async function uploadAttachments(
	attachments: Array<Attachment>,
	aesKey: string,
) {
	const updatedAttachments = await Promise.all(
		attachments.map(async (attachment) => {
			if (!attachment.localId) {
				throw new Error('Attachment localId is missing');
			}
			const file = await fileStorage.getFile(attachment.localId);
			if (!file) {
				throw new Error(`Attachment ${attachment.localId} not found`);
			}

			try {
				const { fileUrl } = await uploadAttachment(file, aesKey);
				attachment.remoteUrl = fileUrl;
				return attachment;
			} catch (error) {
				log('error', 'Failed to upload attachment:', error);
				throw new Error(`Failed to upload attachment: ${attachment.localId}`);
			}
		}),
	);

	console.log('Updated attachments:', updatedAttachments);

	return updatedAttachments;
}

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
