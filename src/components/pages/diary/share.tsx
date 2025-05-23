import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { type Diary, diaryManager } from '@/lib/managers/diary';
import { type User, friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { message } from '@tauri-apps/plugin-dialog';
import { Check, Search, UserRoundX } from 'lucide-react';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
	avatar,
	check,
	empty,
	emptyIcon,
	friendList,
	item,
} from './styles/share.css';

interface DiaryShareSectionProps {
	diary: Diary;
	setDiary: Dispatch<SetStateAction<Diary>>;
}

export function DiaryShareSection(props: DiaryShareSectionProps) {
	const { diary, setDiary } = props;
	const { closeDrawer } = useDrawer('share-diary');
	const [isSearching, setIsSearching] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [searchedUsers, setSearchedUsers] = useState<Array<User>>([]);
	const [selectedUsers, setSelectedUsers] = useState<Array<User>>(
		diary.sharedWith
			.map((uuid) => friendManager.getFriend(uuid))
			.filter(Boolean) as Array<User>,
	);
	const visibleUsers = useMemo(
		() => [...searchedUsers, ...selectedUsers, ...friendManager.getFriends()],
		[searchedUsers, selectedUsers],
	);

	const onSearch = useDebouncedCallback(async (username: string) => {
		if (username) {
			setIsSearching(true);
			apiClient
				.get<Array<User>>(`/users?username=${username}`)
				.then(setSearchedUsers);
		} else {
			setIsSearching(false);
			setSearchedUsers([]);
		}
	}, 300);

	const onClickShare = useCallback(async () => {
		if (!diary.emoji && !diary.title && !diary.content) {
			await message('Please add some content to your diary before sharing.');
			return;
		}

		setIsSharing(true);

		let uuid = diary.uuid;
		if (uuid === 'NOT_SAVED') {
			const savedDiary = await diaryManager.addDiary(diary);
			uuid = savedDiary.uuid;
		}
		const result = await diaryManager.shareDiary(uuid, selectedUsers);
		setDiary(result);

		setIsSharing(false);
		closeDrawer();
	}, [diary, setDiary, selectedUsers, closeDrawer]);

	return (
		<Drawer id='share-diary' preventBackdropClose={isSharing}>
			<Container vertical='small' horizontal='large'>
				<Typo.Lead weight='strong'>Share with your friends</Typo.Lead>
			</Container>
			<Container vertical='small' horizontal='medium'>
				<Input placeholder='Search username' onValue={onSearch} />
			</Container>
			{visibleUsers.length > 0 ? (
				<div className={friendList}>
					{visibleUsers
						.filter(
							(user, index, self) =>
								index === self.findIndex((u) => u.uuid === user.uuid),
						)
						.map((user) => (
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
			) : (
				<Column className={empty} gap={16} align='center'>
					<Container className={emptyIcon}>
						{searchedUsers.length <= 0 && isSearching ? (
							<UserRoundX />
						) : (
							<Search />
						)}
					</Container>
					<Typo.Body>
						{searchedUsers.length <= 0 && isSearching
							? 'No users found'
							: 'Search your friends'}
					</Typo.Body>
				</Column>
			)}
			<ButtonGroup>
				<Button fill onClick={onClickShare} loading={isSharing}>
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
