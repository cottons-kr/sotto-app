import { BanFriendDrawer } from '@/components/features/friend/ban';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { ExplorerContent } from '@/components/pages/explorer/shared/content';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { friendManager } from '@/lib/managers/friend';
import { color } from '@/styles/color.css';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExplorerFriendsDetailPage() {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const friend = useMemo(() => friendManager.getFriend(uuid || ''), [uuid]);
	const [showPublicKey, setShowPublicKey] = useState(false);
	const { show: openBanFriend } = useDrawer(BanFriendDrawer);

	const onClickPublicKey = useCallback(() => {
		setShowPublicKey(true);
	}, []);

	const onClockBlock = useCallback(() => {
		if (friend) {
			openBanFriend({ friend, callback: () => navigate(-1) });
		}
	}, [friend, openBanFriend, navigate]);

	if (!friend) {
		console.error('Friend not found:', uuid);
		navigate(-1);
		return;
	}

	return (
		<>
			<TopNavigator leadingArea={<GoBack label='Friends' />} />
			<Container horizontal='none'>
				<Column gap={16} align='center'>
					<Avatar size={72} src={friend.profileUrl} />
					<Column gap={8} align='center'>
						<Typo.Lead weight='strong'>{friend.name}</Typo.Lead>
						<Typo.Body>@{friend.username}</Typo.Body>
					</Column>
				</Column>
			</Container>
			<PaddingDivider />
			{showPublicKey ? (
				<ExplorerContent label='Public Key' content={friend.publicKey} />
			) : (
				<Container>
					<Button fill variant='secondary' onClick={onClickPublicKey}>
						Click to reveal public key
					</Button>
				</Container>
			)}
			<Container>
				<Column gap={8}>
					<Typo.Caption color={color.sand}>
						Created : {new Date(friend.createdAt).toLocaleString()}
					</Typo.Caption>
					<Typo.Caption color={color.sand}>
						Last Edited : {new Date(friend.updatedAt).toLocaleString()}
					</Typo.Caption>
				</Column>
			</Container>
			<ButtonGroup float>
				<Button fill onClick={onClockBlock}>
					Block
				</Button>
			</ButtonGroup>
		</>
	);
}
