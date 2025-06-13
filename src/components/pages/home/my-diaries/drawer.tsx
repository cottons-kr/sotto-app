import { DeleteDiaryPopup } from '@/components/features/diary/delete-popup';
import { DiaryDetailDrawer } from '@/components/features/diary/detail-drawer';
import { Container } from '@/components/layout/container';
import { AvatarItem } from '@/components/ui/avatar/item';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { log } from '@/lib/log';
import { diaryManager } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback } from 'react';
import { list } from './styles/my-diary-drawer.css';

interface HomeMyDiaryDrawerProps {
	diary: Diary;
	onDelete?: () => void;
}

export function HomeMyDiaryDrawer(
	props: HomeMyDiaryDrawerProps & OverlayProps,
) {
	const { diary, onDelete, close } = props;
	const { show: openDelete } = useOverlay(DeleteDiaryPopup);

	const onClickCancelSharing = useCallback(async () => {
		try {
			await diaryManager.cancelShare(diary.uuid);
		} catch (error) {
			log('error', 'Fail to cancel sharing diary', error);
			await message('Failed to cancel sharing the diary.');
		} finally {
			close();
		}
	}, [diary, close]);

	const onClickDelete = useCallback(() => {
		openDelete({ diary, callback: onDelete || (() => {}) });
	}, [diary, openDelete, onDelete]);

	return (
		<DiaryDetailDrawer diary={diary} close={close}>
			{diary.sharedWith.length > 0 && (
				<Container vertical='small' horizontal='none'>
					<Container vertical='small'>
						<Typo.Body weight='medium'>
							Shared with {diary.sharedWith.length.toLocaleString()} friend
							{diary.sharedWith.length > 1 ? 's' : ''}
						</Typo.Body>
					</Container>
					<div className={list}>
						{diary.sharedWith.map((uuid) => {
							const friend = friendManager.getFriend(uuid);
							if (!friend) return null;
							return <AvatarItem key={friend.uuid} user={friend} selected />;
						})}
					</div>
				</Container>
			)}
			<ButtonGroup>
				{diary.sharedWith.length > 0 && (
					<Button fill variant='secondary' onClick={onClickCancelSharing}>
						Cancel sharing
					</Button>
				)}
				<Button fill onClick={onClickDelete}>
					Delete diary
				</Button>
			</ButtonGroup>
		</DiaryDetailDrawer>
	);
}
