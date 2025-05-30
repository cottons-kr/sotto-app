import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { log } from '@/lib/log';
import { type Diary, diaryManager } from '@/lib/managers/diary';
import { message } from '@tauri-apps/plugin-dialog';
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

interface ExplorerDiariesDeleteDrawerProps {
	diary: Diary;
	back: () => void;
}

export function ExplorerDiariesDeletePopup(
	props: ExplorerDiariesDeleteDrawerProps & OverlayProps,
) {
	const { diary, back, close } = props;

	const onClickDelete = useCallback(async () => {
		try {
			diaryManager.removeDiary(diary.uuid);
			back();
		} catch (error) {
			log('error', 'Failed to delete diary:', error);
			await message('Failed to delete diary.');
		} finally {
			close();
		}
	}, [diary, close, back]);

	return (
		<Popup>
			<PopupContent
				icon={<TriangleAlert />}
				title='Delete diary?'
				description='Deleted diaries cannot be recovered'
			/>
			<ButtonGroup direction='horizontal' smallPadding>
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
