import { AppContext } from '@/App';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { log } from '@/lib/log';
import type { Reply } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { message } from '@tauri-apps/plugin-dialog';
import { TriangleAlert } from 'lucide-react';
import { useCallback, useContext } from 'react';

interface ReplyDeletePopupProps {
	reply: Reply;
	onDelete: () => unknown;
}

export function ReplyDeletePopup(props: ReplyDeletePopupProps & OverlayProps) {
	const { reply, onDelete, close } = props;

	const { forceUpdate } = useContext(AppContext);

	const onClickDelete = useCallback(async () => {
		try {
			await apiClient.delete(`/replies/${reply.uuid}`);
			onDelete();
			forceUpdate();
		} catch (error) {
			log('error', 'Failed to delete reply', error);
			await message(`Failed to delete reply: ${error}`);
			return;
		} finally {
			close();
		}
	}, [reply.uuid, onDelete, close, forceUpdate]);

	const author = friendManager.getFriend(reply.authorId);
	if (!author) {
		return null;
	}

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
