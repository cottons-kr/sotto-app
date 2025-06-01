import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Avatar } from '@/components/ui/avatar';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { type User, friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { Check, Search, UserRoundX } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
	avatar,
	check,
	empty,
	emptyIcon,
	friendList,
	item,
} from './styles/picker-drawer.css';

interface UserPickerDrawerProps {
	title: string;
	placeholder?: string;
	buttons: React.ReactNode;
	defaultSelected?: Array<string>;
}

export function UserPickerDrawer(props: UserPickerDrawerProps & OverlayProps) {
	const {
		title,
		placeholder = 'Search username',
		buttons,
		defaultSelected = [],
		close,
	} = props;
	const [isSearching, setIsSearching] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [searchedUsers, setSearchedUsers] = useState<Array<User>>([]);
	const [selectedUsers, setSelectedUsers] = useState<Array<User>>(
		defaultSelected
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

	return (
		<Drawer preventBackdropClose={isSharing} close={close}>
			<Container vertical='small' horizontal='large'>
				<Typo.Lead weight='strong'>{title}</Typo.Lead>
			</Container>
			<Container vertical='small' horizontal='medium'>
				<Input placeholder={placeholder} onValue={onSearch} />
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
							: 'Search users'}
					</Typo.Body>
				</Column>
			)}
			<ButtonGroup direction='horizontal'>{buttons}</ButtonGroup>
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
