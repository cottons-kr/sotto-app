import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Divider } from '@/components/ui/divider';
import { Drawer } from '@/components/ui/drawer';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { banWarning } from '@/routes/home/page.css';
import { Ban } from 'lucide-react';

export function HomeFriendsDiariesSection() {
	return (
		<>
			<FriendDiaries />
			<FriendDiaries />
			<FriendDiaries />
			<FriendDiaries />
		</>
	);
}

function FriendDiaries() {
	const { toggleDrawer } = useDrawer('ban-user');

	return (
		<>
			<Container vertical='small'>
				<Row align='center' justify='space-between'>
					<Row align='center' gap={8}>
						<Avatar />
						<Typo.Body weight='strong'>Yuchan Han</Typo.Body>
					</Row>
					<Ban size={20} onClick={toggleDrawer} />
				</Row>
			</Container>
			<Container vertical='small'>
				<Grid />
			</Container>
			<Container horizontal='none'>
				<Divider />
			</Container>
			<Drawer id='ban-user'>
				<Container horizontal='large'>
					<Column gap={8}>
						<Typo.Lead weight='strong'>Block “Yuchan Han”?</Typo.Lead>
						<Typo.Body className={banWarning}>
							You will never receive friends diary from “Yuchan Han”
						</Typo.Body>
					</Column>
				</Container>
				<ButtonGroup direction='horizontal'>
					<Button fill>Block</Button>
					<Button variant='secondary' fill>
						Cancel
					</Button>
				</ButtonGroup>
			</Drawer>
		</>
	);
}
