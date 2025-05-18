import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';
import { type Diary, diaryManager } from '@/lib/managers/diary';
import { type User, friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { Check } from 'lucide-react';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { avatar, check, friendList, item } from './styles/share.css';

interface DiaryShareSectionProps {
	diary: Diary;
	setDiary: Dispatch<SetStateAction<Diary>>;
}

export function DiaryShareSection(props: DiaryShareSectionProps) {
	const { diary, setDiary } = props;
	const [visibleUsers, setVisibleUsers] = useState(friendManager.getFriends());
	const [searchedUsers, setSearchedUsers] = useState<Array<User>>([]);
	const [selectedUsers, setSelectedUsers] = useState<Array<User>>(
		diary.sharedWith
			.map((uuid) => friendManager.getFriend(uuid))
			.filter(Boolean) as Array<User>,
	);

	const onSearch = useDebouncedCallback(async (username: string) => {
		if (username) {
			apiClient
				.get<Array<User>>(`/users?username=${username}`)
				.then(setSearchedUsers);
		} else {
			setSearchedUsers([]);
		}
	}, 300);

	const onClickShare = useCallback(async () => {
		if (
			visibleUsers.length === 0 ||
			(!diary.emoji && !diary.title && !diary.content)
		) {
			return;
		}

		let uuid = diary.uuid;
		if (uuid === 'NOT_SAVED') {
			const savedDiary = await diaryManager.addDiary(diary);
			uuid = savedDiary.uuid;
		}
		const result = await diaryManager.shareDiary(uuid, selectedUsers);
		setDiary(result);
	}, [diary, setDiary, visibleUsers, selectedUsers]);

	return (
		<Drawer id='share-diary'>
			<Container vertical='small' horizontal='large'>
				<Typo.Lead weight='strong'>Share with your friends</Typo.Lead>
			</Container>
			<Container vertical='small' horizontal='medium'>
				<Input placeholder='Search username' onValue={onSearch} />
			</Container>
			<div className={friendList}>
				{[...searchedUsers, ...visibleUsers].map((user) => (
					<UserItem
						key={user.uuid}
						user={user}
						selected={selectedUsers.map((u) => u.uuid).includes(user.uuid)}
						onClick={() =>
							setSelectedUsers((prev) => {
								if (prev.map((u) => u.uuid).includes(user.uuid)) {
									return prev.filter((u) => u.uuid !== user.uuid);
								}
								return [...prev, user];
							})
						}
					/>
				))}
			</div>
			<ButtonGroup>
				<Button fill onClick={onClickShare}>
					Apply
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}

interface UserItemProps {
	user: User;
	selected?: boolean;
	onClick?: () => unknown;
}

function UserItem(props: UserItemProps) {
	const { user, selected, onClick } = props;

	return (
		<Column className={item} gap={8} align='center' onClick={onClick}>
			<div className={avatar}>
				<Avatar size={48} src={user.profileUrl} />
				{selected && (
					<div className={check}>
						<Check size={16} />
					</div>
				)}
			</div>
			<Typo.Caption>{user.name}</Typo.Caption>
		</Column>
	);
}
