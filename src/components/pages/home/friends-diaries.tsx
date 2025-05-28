import { decryptDiary } from '@/binding/function/decrypt-diary';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { DiaryCard } from '@/components/ui/card/diary';
import { Content } from '@/components/ui/content';
import { Divider } from '@/components/ui/divider';
import { Drawer } from '@/components/ui/drawer';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { diaryManager } from '@/lib/managers/diary';
import { type User, friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { storageClient } from '@/lib/managers/storage';
import { banWarning } from '@/routes/home/page.css';
import { Ban, SmilePlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { center } from './styles/friends-diaries.css';

export function HomeFriendsDiariesSection() {
	const [friendList, setFriendList] = useState<Array<string>>(
		friendManager
			.getFriends()
			.map((friend) => friend.uuid)
			.filter((userUUID) => diaryManager.getFriendDiaries(userUUID).length > 0),
	);

	useEffect(() => {
		apiClient
			.get<SharedDiariesResponse>('/diaries/shared')
			.then(async (data) => {
				const privateKey = await storageClient.get('privateKey');
				if (!privateKey) {
					throw new Error('Private key not found');
				}
				for (const sharedDiary of data) {
					const { emoji, title, content } = await decryptDiary(
						privateKey,
						sharedDiary.diary.data,
						sharedDiary.encryptedKey,
						sharedDiary.diary.nonce,
					);

					if (friendManager.isFriend(sharedDiary.diary.owner.uuid)) {
						friendManager.updateFriend(
							sharedDiary.diary.owner.uuid,
							sharedDiary.diary.owner,
						);
					}

					if (!diaryManager.isSharedDiaryExists(sharedDiary.diary.uuid)) {
						friendManager.addFriend(sharedDiary.diary.owner);
						await diaryManager.addDiary({
							uuid: sharedDiary.diary.uuid,
							emoji,
							title,
							content,
							shareUUID: sharedDiary.diary.uuid,
							sharedBy: sharedDiary.diary.owner.uuid,
							encryptedKey: sharedDiary.encryptedKey,
							readonly: true,
						});
					} else {
						await diaryManager.updateDiary(sharedDiary.diary.uuid, {
							emoji,
							title,
							content,
						});
					}
				}
				for (const existingSharedDiary of diaryManager.getSharedDiaries()) {
					const isSharingCanceled = data.every(
						(b) => b.diary.uuid !== existingSharedDiary.shareUUID,
					);
					if (isSharingCanceled) {
						diaryManager.removeDiary(existingSharedDiary.uuid);
					}
				}
				setFriendList(
					friendManager
						.getFriends()
						.map((friend) => friend.uuid)
						.filter(
							(userUUID) => diaryManager.getFriendDiaries(userUUID).length > 0,
						),
				);
			});
	}, []);

	return friendList.length > 0 ? (
		friendList.map((userUUID) => (
			<FriendDiaries key={userUUID} userUUID={userUUID} />
		))
	) : (
		<Content
			icon={<SmilePlus size={48} />}
			description='Share this app to your friends'
		/>
	);
}

interface FriendDiariesProps {
	userUUID: string;
}

function FriendDiaries(props: FriendDiariesProps) {
	const { userUUID } = props;

	const { show } = useDrawer(BanUserDrawer);
	const user = friendManager.getFriend(userUUID);
	const diaries = diaryManager.getFriendDiaries(userUUID);
	if (!user) {
		return null;
	}

	const showBanDrawer = useCallback(() => {
		show({ user });
	}, [show, user]);

	return (
		<>
			<Container vertical='small'>
				<Row align='center' justify='space-between'>
					<Row align='center' gap={8}>
						<Avatar src={user.profileUrl} />
						<Typo.Body weight='strong'>{user.name}</Typo.Body>
					</Row>
					<Ban size={20} onClick={showBanDrawer} />
				</Row>
			</Container>
			<Container vertical='small'>
				<Grid>
					{diaries.map((d) => (
						<DiaryCard key={d.uuid} diary={d} />
					))}
				</Grid>
			</Container>
			<Container horizontal='none'>
				<Divider />
			</Container>
		</>
	);
}

interface BanUserDrawerProps {
	user: User;
}

function BanUserDrawer(props: BanUserDrawerProps & OverlayProps) {
	const { user, close } = props;

	const onClickBlock = useCallback(async () => {
		for (const diary of diaryManager.getFriendDiaries(user.uuid)) {
			diaryManager.removeDiary(diary.uuid);
		}
		friendManager.removeFriend(user.uuid);

		await apiClient.post('/users/ban', {
			uuid: user.uuid,
		});

		close();
	}, [user.uuid, close]);

	return (
		<Drawer>
			<Container horizontal='none'>
				<Container vertical='regular' className={center}>
					<Avatar size={56} src={user.profileUrl} />
				</Container>
				<Container className={center} vertical='small'>
					<Typo.Lead weight='strong'>Block “{user.name}”?</Typo.Lead>
				</Container>
				<Container className={center} vertical='none'>
					<Typo.Body className={banWarning}>
						You will never receive friends diary from “{user.name}”
					</Typo.Body>
				</Container>
			</Container>
			<ButtonGroup direction='horizontal'>
				<Button fill onClick={onClickBlock}>
					Block
				</Button>
				<Button variant='secondary' fill onClick={close}>
					Cancel
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
