import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/field';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { log } from '@/lib/log';
import { locationManager } from '@/lib/managers/location';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';

export function LocationAliasAddDrawer(props: OverlayProps) {
	const { close } = props;

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');

	const onClickAdd = useCallback(async () => {
		if (!name || !address) {
			await message('Please fill in all fields.');
			return;
		}

		try {
			await locationManager.addAlias(name, address);
		} catch (error) {
			log('error', 'Failed to add alias:', error);
			await message('Failed to add alias.');
		} finally {
			close();
		}
	}, [name, address, close]);

	return (
		<Drawer close={close}>
			<DrawerTitle>Add other alias</DrawerTitle>
			<InputField label='Name'>
				<Input placeholder='Enter name' value={name} onValue={setName} />
			</InputField>
			<InputField label='Address'>
				<Input
					placeholder='Enter address'
					value={address}
					onValue={setAddress}
				/>
			</InputField>
			<ButtonGroup>
				<Button fill onClick={onClickAdd}>
					Add
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
