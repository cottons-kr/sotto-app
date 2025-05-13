import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Card } from '@/components/ui/card';
import { SottoSymbol } from '@/components/ui/sotto-symbol';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent } from '@/components/ui/tabs/content';
import { TabsGroup, TabsItem } from '@/components/ui/tabs/item';
import { TopNavigator } from '@/components/ui/top-navigator';
import { Typo } from '@/components/ui/typography';
import { Link } from 'react-router-dom';
import { left, right } from './page.css';

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
					trailingArea={<Avatar className={right} />}
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
								<Card />
								<Card />
								<Card />
								<Card />
								<Card />
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
					<TabsContent value='shared'>shared</TabsContent>
				</Tabs>
			</Column>
		</>
	);
}
