import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { useAuth } from '@/hooks/use-auth';
import { log } from '@/lib/log';
import { type Diary, diaryManager } from '@/lib/managers/diary';
import { message } from '@tauri-apps/plugin-dialog';
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

interface DeleteDiaryPopupProps {
	diary: Diary;
	callback: () => unknown;
}

export function DeleteDiaryPopup(props: DeleteDiaryPopupProps & OverlayProps) {
	const { diary, callback, close } = props;
	const authenticate = useAuth();

	const onClickDelete = useCallback(() => {
		authenticate(async () => {
			try {
				await diaryManager.removeDiary(diary.uuid);
				await callback();
			} catch (error) {
				log('error', 'Failed to delete diary:', error);
				await message('Failed to delete diary.');
			} finally {
				close();
			}
		});
	}, [authenticate, diary, close, callback]);

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
