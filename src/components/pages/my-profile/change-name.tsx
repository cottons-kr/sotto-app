import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { log } from '@/lib/log';
import { apiClient } from '@/lib/managers/http';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';

export function MyProfileChangeNameDrawer(props: OverlayProps) {
	const { close } = props;

	const [name, setName] = useState(localStorage.getItem('name') || '');

	const onClickChange = useCallback(async () => {
		const prevName = localStorage.getItem('name');
		if (prevName === name) {
			close();
			return;
		}

		if (!/^[a-zA-Z\s]+$/.test(name)) {
			await message('Name can only contain letters and spaces.', {
				kind: 'error',
			});
			close();
			return;
		}

		try {
			await apiClient.patch('/users/me', {
				name,
			});
			localStorage.setItem('name', name);
		} catch (error) {
			await message('Failed to change name');
			log('error', 'Failed to change name', error);
			if (prevName) {
				localStorage.setItem('name', prevName);
				setName(prevName);
			}
		} finally {
			close();
		}
	}, [name, close]);

	return (
		<Drawer {...props}>
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
