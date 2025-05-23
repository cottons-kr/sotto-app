import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { apiClient } from '@/lib/managers/http';
import { useCallback, useState } from 'react';

export function MyProfileChangeName() {
	const { closeDrawer } = useDrawer('change-name');
	const [name, setName] = useState(localStorage.getItem('name') || '') ;

	const onClickChange = useCallback(async () => {
		try {
			await apiClient.patch('/user/me', {
				name,
			});
			localStorage.setItem('name', name);
		} finally {
			closeDrawer();
		}
	}, [name, closeDrawer]);

	return (
		<Drawer id='change-name'>
			<Container vertical='small' horizontal='large'>
				<Typo.Lead weight='strong'>Change name</Typo.Lead>
			</Container>
			<Container vertical='small'>
				<Input placeholder='New name' value={name} onValue={setName} />
			</Container>
			<ButtonGroup>
				<Button fill onClick={onClickChange} disabled={!name}>
					Change
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
