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
import { friendManager } from '@/lib/managers/friend';
import { color } from '@/styles/color.css';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExplorerFriendsDetailPage() {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const friend = useMemo(() => friendManager.getFriend(uuid || ''), [uuid]);

	console.log('Friend Detail Page', { uuid, friend });

	const onClockBlock = useCallback(() => {}, []);

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
			<ExplorerContent label='Public Key' content={friend.publicKey} />
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
