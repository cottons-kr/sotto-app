import { decryptDiary } from '@/binding/function/decrypt-diary';
import { BanFriendDrawer } from '@/components/features/user/ban-drawer';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { DiaryCard } from '@/components/ui/card/diary';
import { Content } from '@/components/ui/content';
import { Divider } from '@/components/ui/divider';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { log } from '@/lib/log';
import { diaryManager } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { storageClient } from '@/lib/managers/storage';
import { Ban, SmilePlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
							encryptedData: sharedDiary.diary.data,
							nonce: sharedDiary.diary.nonce,
							encryptedKey: sharedDiary.encryptedKey,
							readonly: true,
						});
					} else {
						await diaryManager.updateDiary(sharedDiary.diary.uuid, {
							emoji,
							title,
							content,
							encryptedData: sharedDiary.diary.data,
							nonce: sharedDiary.diary.nonce,
							encryptedKey: sharedDiary.encryptedKey,
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

	const { show } = useDrawer(BanFriendDrawer);
	const user = friendManager.getFriend(userUUID);
	const diaries = diaryManager.getFriendDiaries(userUUID);

	const showBanDrawer = useCallback(() => {
		if (user) {
			show({ friend: user });
		} else {
			log('error', 'User not found for ban drawer');
		}
	}, [show, user]);

	if (!user) {
		return null;
	}

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
