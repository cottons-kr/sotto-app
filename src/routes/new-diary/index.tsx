import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Divider } from '@/components/ui/divider';
import { Drawer } from '@/components/ui/drawer';
import { useDrawer } from '@/components/ui/drawer/use-drawer';
import { Input } from '@/components/ui/input';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { color } from '@/styles/color.css';
import { Share } from 'lucide-react';
import {
	friendList,
	page,
	textArea,
	textAreaContainer,
	titleInput,
} from './page.css';

export default function NewDiaryPage() {
	const { toggleDrawer } = useDrawer('share');

	return (
		<>
			<Column className={page} justify='start'>
				<TopNavigator
					leadingArea={<GoBack />}
					trailingArea={<Share onClick={toggleDrawer} />}
				/>
				<Container vertical='large' horizontal='large'>
					<Column gap={12}>
						<input className={titleInput} placeholder='New Diary' />
						<Typo.Caption color={color.sand}>
							Last Edited : 9:41 PM
						</Typo.Caption>
					</Column>
				</Container>
				<Divider />
				<Container
					className={textAreaContainer}
					vertical='large'
					horizontal='large'
				>
					<textarea className={textArea} placeholder='Write your diary' />
				</Container>
			</Column>
			<Drawer id='share'>
				<Container vertical='small' horizontal='large'>
					<Typo.Lead weight='strong'>Share with your friends</Typo.Lead>
				</Container>
				<Container vertical='small' horizontal='medium'>
					<Input placeholder='Search username' />
				</Container>
				<Column className={friendList} gap={12} wrap='wrap' justify='start'>
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
					<Friend />
				</Column>
				<ButtonGroup>
					<Button fill>Share</Button>
				</ButtonGroup>
			</Drawer>
		</>
	);
}

function Friend() {
	return (
		<Column gap={8} align='center'>
			<Avatar size={48} />
			<Typo.Caption>Yuchan Han</Typo.Caption>
		</Column>
	);
}
