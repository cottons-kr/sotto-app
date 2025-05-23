import { Column } from '@/components/layout/column';
import { Row } from '@/components/layout/row';
import { HomeFriendsDiariesSection } from '@/components/pages/home/friends-diaries';
import { HomeMyDiariesSection } from '@/components/pages/home/my-diaries';
import { Avatar } from '@/components/ui/avatar';
import { SottoSymbol } from '@/components/ui/sotto-symbol';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent } from '@/components/ui/tabs/content';
import { TabsGroup, TabsItem } from '@/components/ui/tabs/item';
import { TopNavigator } from '@/components/ui/top-navigator';
import { Typo } from '@/components/ui/typography';
import { fullHeight } from '@/styles/utils.css';
import { left, right } from './page.css';

export default function HomePage() {
	return (
		<>
			<Column className={fullHeight} justify='start'>
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
						<TabsItem value='friends'>Friends</TabsItem>
					</TabsGroup>
					<TabsContent value='my'>
						<HomeMyDiariesSection />
					</TabsContent>
					<TabsContent value='friends'>
						<HomeFriendsDiariesSection />
					</TabsContent>
				</Tabs>
			</Column>
		</>
	);
}
