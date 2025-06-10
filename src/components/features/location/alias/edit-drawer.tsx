import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/field';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { log } from '@/lib/log';
import { type Location, locationManager } from '@/lib/managers/location';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';

interface LocationAliasEditDrawerProps {
	alias: Location;
}

export function LocationAliasEditDrawer(
	props: LocationAliasEditDrawerProps & OverlayProps,
) {
	const { alias, close } = props;

	const [name, setName] = useState(alias.name || '');
	const [address, setAddress] = useState(alias.address);

	const onClickApply = useCallback(async () => {
		if (!name || !address) {
			await message('Please fill in all fields.');
			return;
		}

		try {
			await locationManager.updateAlias(alias.uuid, { name, address });
		} catch (error) {
			log('error', 'Failed to edit alias:', error);
			await message('Failed to edit alias.');
		} finally {
			close();
		}
	}, [alias.uuid, name, address, close]);

	return (
		<Drawer close={close}>
			<DrawerTitle>Edit {alias.name ? `"${alias.name}"` : 'alias'}</DrawerTitle>
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
				<Button fill onClick={onClickApply}>
					Apply
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
