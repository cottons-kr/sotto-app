import { encryptData } from '@/binding/function/encrypt-data';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import type { Diary } from '@/lib/managers/diary';
import { apiClient } from '@/lib/managers/http';
import { CloudUpload } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface AttachmentUploadPopupProps {
	diary: Diary;
	attachments: Array<File>;
}

export function AttachmentUploadPopup(
	props: AttachmentUploadPopupProps & OverlayProps,
) {
	const { attachments, close } = props;

	const [order, setOrder] = useState(0);
	const [status, setStatus] = useState('Encrypting');
	const [isCancelled, setIsCancelled] = useState(false);

	const onClickCancel = useCallback(() => {
		setIsCancelled(true);
		close();
	}, [close]);

	const uploadAttachment = useCallback(async (file: File) => {
		setStatus('Encrypting');

		const base64Data = await file
			.arrayBuffer()
			.then((buffer) => Buffer.from(buffer).toString('base64'));
		const [, /* aesKey */ /* nonce */ ,] = await encryptData(base64Data);

		setStatus('Uploading');
		await apiClient.get('/attachments/presigned-url');
	}, []);

	useEffect(() => {
		const uploadNext = async () => {
			const file = attachments[order];
			await uploadAttachment(file);

			if (order >= attachments.length - 1 || isCancelled) {
				close();
				return;
			}
			setOrder((prev) => prev + 1);
		};

		uploadNext();
	}, [attachments, close, order, uploadAttachment, isCancelled]);

	return (
		<Popup>
			<PopupContent
				icon={<CloudUpload />}
				title='Uploading attachments'
				description={`${order + 1} / ${attachments.length} - ${status}`}
			/>
			<ButtonGroup smallPadding>
				<Button fill variant='secondary' onClick={onClickCancel}>
					Cancel
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
