import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';
import { friendList } from '@/routes/diary/page.css';

export function DiaryShareSection() {
	return (
		<Drawer id='share-diary'>
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
