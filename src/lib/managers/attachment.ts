import { encryptData } from '@/binding/function/encrypt-data';
import { convertFileToBase64 } from '../common';
import { apiClient } from './http';

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
