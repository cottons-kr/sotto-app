import { DiaryDetailDrawer } from '@/components/features/diary/detail-drawer';
import { BanFriendDrawer } from '@/components/features/user/ban-drawer';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import type { Diary } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { useCallback } from 'react';

interface HomeFriendDiaryDrawerProps {
	diary: Diary;
	onDelete?: () => void;
}

export function HomeFriendDiaryDrawer(
	props: HomeFriendDiaryDrawerProps & OverlayProps,
) {
	const { diary, onDelete, close } = props;
	const friend = friendManager.getFriend(diary?.sharedBy || '');
	const { show: openBanFriend } = useOverlay(BanFriendDrawer);

	const onClickDelete = useCallback(() => {
		if (friend) {
			openBanFriend({
				friend,
				callback: () => {
					onDelete?.();
					close();
				},
			});
		}
	}, [friend, openBanFriend, onDelete, close]);

	if (!friend) {
		return null;
	}

	return (
		<DiaryDetailDrawer diary={diary} close={close}>
			<Container horizontal='large'>
				<Row gap={8} align='center' justify='start'>
					<Avatar size={32} />
					<Typo.Body weight='medium'>Shared by {friend.name}</Typo.Body>
				</Row>
			</Container>
			<ButtonGroup>
				<Button fill onClick={onClickDelete}>
					Block “{friend.name}”
				</Button>
			</ButtonGroup>
		</DiaryDetailDrawer>
	);
}
