import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/field';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { useOverlay } from '@/hooks/use-overlay';
import {
	type LocationPresetKey,
	locationManager,
} from '@/lib/managers/location';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';
import { LocationPresetsResetConfirmPopup } from './reset-confirm-popup';

interface LocationPresetsAddDrawerProps {
	name: LocationPresetKey;
}

export function LocationPresetsEditDrawer(
	props: LocationPresetsAddDrawerProps & OverlayProps,
) {
	const { name, close } = props;

	const [address, setAddress] = useState(
		locationManager.getPresets()[name]?.address || '',
	);
	const { show: openResetConfirm } = useOverlay(
		LocationPresetsResetConfirmPopup,
	);

	const onClickApply = useCallback(async () => {
		if (!address.trim()) {
			await message('Please enter a valid address.');
			return;
		}

		try {
			await locationManager.setPreset(name, address);
		} catch (error) {
			await message('Failed to add preset');
			return;
		} finally {
			close();
			setTimeout(() => setAddress(''), 200);
		}
	}, [address, close, name]);

	const onClickReset = useCallback(async () => {
		openResetConfirm({ name, callback: close });
	}, [name, close, openResetConfirm]);

	return (
		<Drawer close={close}>
			<DrawerTitle>Edit "{locationManager.getPresetName(name)}"</DrawerTitle>
			<InputField>
				<Input
					placeholder='Enter address'
					value={address}
					onValue={setAddress}
				/>
			</InputField>
			<ButtonGroup>
				<Button fill variant='secondary' onClick={onClickReset}>
					Reset
				</Button>
				<Button fill onClick={onClickApply}>
					Apply
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
