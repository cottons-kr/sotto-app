import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { Drawer } from '@/components/ui/drawer';
import { SottoSymbol } from '@/components/ui/sotto-symbol';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent } from '@/components/ui/tabs/content';
import { TabsGroup, TabsItem } from '@/components/ui/tabs/item';
import { TopNavigator } from '@/components/ui/top-navigator';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { Ban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { banWarning, left, right } from './page.css';

export default function HomePage() {
	return (
		<>
			<Column>
				<TopNavigator
					leadingArea={
						<Row className={left} align='center' gap={6}>
							<SottoSymbol />
							<Typo.Lead weight='strong'>Sotto</Typo.Lead>
						</Row>
					}
					trailingArea={
						<Avatar
							className={right}
							src={localStorage.getItem('profileImage')}
						/>
					}
				/>
				<Tabs defaultValue='my'>
					<TabsGroup>
						<TabsItem value='my'>My</TabsItem>
						<TabsItem value='shared'>Shared</TabsItem>
					</TabsGroup>
					<TabsContent value='my'>
						<Container>
							<Grid>
								<Card />
								<Card />
								<Card />
								<Card />
								<Card />
							</Grid>
						</Container>
						<ButtonGroup direction='vertical' float>
							<Link to='/new-diary'>
								<Button fill>New Diary</Button>
							</Link>
						</ButtonGroup>
					</TabsContent>
					<TabsContent value='shared'>
						<FriendDiaries />
						<FriendDiaries />
						<FriendDiaries />
						<FriendDiaries />
					</TabsContent>
				</Tabs>
			</Column>
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
				<Grid>
					<Card />
					<Card />
					<Card />
					<Card />
				</Grid>
			</Container>
			<Container horizontal='none'>
				<Divider />
			</Container>
			<Drawer id='ban-user'>
				<Container horizontal='large'>
					<Column gap={8}>
						<Typo.Lead weight='strong'>Block “Yuchan Han”?</Typo.Lead>
						<Typo.Body className={banWarning}>
							You will never receive shared diary from “Yuchan Han”
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
