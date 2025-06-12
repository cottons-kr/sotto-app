import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import type { Diary } from '@/lib/managers/diary';
import { CloudUpload } from 'lucide-react';
import { useCallback, useState } from 'react';

interface AttachmentUploadPopupProps {
	diary: Diary;
	attachments: Array<File>;
}

export function AttachmentUploadPopup(
	props: AttachmentUploadPopupProps & OverlayProps,
) {
	const { diary, attachments, close } = props;

	const [order, setOrder] = useState(0);
	const [status, setStatus] = useState('Encrypting');

	const onClickCancel = useCallback(() => {
		close();
	}, [close]);

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
