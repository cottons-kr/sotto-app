import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { ExplorerHeader } from '@/components/pages/explorer/shared/header';
import { Avatar } from '@/components/ui/avatar';
import { ListItem } from '@/components/ui/list-item';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { friendManager } from '@/lib/managers/friend';
import { ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExplorerFriendsPage() {
	const navigate = useNavigate();
	const friends = friendManager.getFriends();

	return (
		<>
			<TopNavigator
				leadingArea={<GoBack label='Profile' />}
				trailingArea={<Plus />}
			/>
			<ExplorerHeader
				title='Friends'
				count={friends.length}
				placeholder='Search by name or username'
			/>
			<Container>
				<Column gap={8}>
					{friends.map((f) => (
						<ListItem
							key={f.uuid}
							leadingArea={
								<Row align='center' gap={8}>
									<Avatar size={32} src={f.profileUrl} />
									<Typo.Body weight='strong'>{f.name}</Typo.Body>
								</Row>
							}
							trailingArea={<ChevronRight size={20} />}
							onClick={() => navigate(`/explorer/friends/${f.uuid}`)}
						/>
					))}
				</Column>
			</Container>
		</>
	);
}
