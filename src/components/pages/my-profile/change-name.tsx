import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';

export function MyProfileChangeName() {
	return (
		<Drawer id='change-name'>
			<Container vertical='small' horizontal='large'>
				<Typo.Lead weight='strong'>Change name</Typo.Lead>
			</Container>
			<Container vertical='small'>
				<Input placeholder='New name' />
			</Container>
			<ButtonGroup>
				<Button fill>Change</Button>
			</ButtonGroup>
		</Drawer>
	);
}
