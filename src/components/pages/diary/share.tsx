import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';
import { type User, userManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { friendList } from '@/routes/diary/page.css';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { avatar, check } from './styles/share.css';

export function DiaryShareSection() {
	const [visibleUsers, setVisibleUsers] = useState(userManager.getFriends());
	const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);

	const onSearch = useDebouncedCallback(async (username: string) => {
		if (username) {
			apiClient
				.get<Array<User>>(`/users?username=${username}`)
				.then((res) => setVisibleUsers((prev) => [...res, ...prev]));
		} else {
			setVisibleUsers((prev) =>
				prev.filter((user) => selectedUsers.includes(user.uuid)),
			);
		}
	}, 300);

	const onClickShare = async () => {};

	return (
		<Drawer id='share-diary'>
			<Container vertical='small' horizontal='large'>
				<Typo.Lead weight='strong'>Share with your friends</Typo.Lead>
			</Container>
			<Container vertical='small' horizontal='medium'>
				<Input placeholder='Search username' onValue={onSearch} />
			</Container>
			<Column
				className={friendList}
				gap={12}
				wrap='wrap'
				align='start'
				justify='start'
			>
				{visibleUsers.map((user) => (
					<UserItem
						key={user.uuid}
						user={user}
						selected={selectedUsers.includes(user.uuid)}
						onClick={() =>
							setSelectedUsers((prev) => {
								if (prev.includes(user.uuid)) {
									return prev.filter((uuid) => uuid !== user.uuid);
								}
								return [...prev, user.uuid];
							})
						}
					/>
				))}
			</Column>
			<ButtonGroup>
				<Button fill onClick={onClickShare}>
					Share
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
		<Column gap={8} align='center' onClick={onClick}>
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
