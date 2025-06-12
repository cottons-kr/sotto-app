import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import type { Reply } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

interface ReplyDeletePopupProps {
	reply: Reply;
}

export function ReplyDeletePopup(props: ReplyDeletePopupProps & OverlayProps) {
	const { reply, close } = props;

	const author = friendManager.getFriend(reply.authorId);
	if (!author) {
		return null;
	}

	const onClickDelete = useCallback(async () => {
		close();
	}, [close]);

	return (
		<Popup>
			<PopupContent
				icon={<TriangleAlert />}
				title={`Delete ${author.name}'s reply?`}
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
