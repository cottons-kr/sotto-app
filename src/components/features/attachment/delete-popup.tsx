import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

interface AttachmentDeletePopupProps {
	handleDelete: () => unknown;
}

export function AttachmentDeletePopup(
	props: AttachmentDeletePopupProps & OverlayProps,
) {
	const { handleDelete, close } = props;

	const onClickDelete = useCallback(() => {
		try {
			handleDelete();
		} finally {
			close();
		}
	}, [handleDelete, close]);

	return (
		<Popup>
			<PopupContent
				icon={<TriangleAlert />}
				title='Delete attachment?'
				description='This action cannot be undo.'
			/>
			<ButtonGroup smallPadding>
				<Button fill onClick={onClickDelete}>
					Delete
				</Button>
				<Button fill variant='secondary' onClick={close}>
					Cancel
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
