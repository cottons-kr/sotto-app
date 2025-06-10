import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { log } from '@/lib/log';
import { type Location, locationManager } from '@/lib/managers/location';
import { message } from '@tauri-apps/plugin-dialog';
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

interface LocationAliasDeleteConfirmPopupProps {
	alias: Location;
}

export function LocationAliasDeleteConfirmPopup(
	props: LocationAliasDeleteConfirmPopupProps & OverlayProps,
) {
	const { alias, close } = props;

	const onClickDelete = useCallback(async () => {
		try {
			await locationManager.deleteAlias(alias.uuid);
		} catch (error) {
			log('error', 'Failed to delete alias:', error);
			await message('Failed to delete alias.');
			return;
		} finally {
			close();
		}
	}, [alias.uuid, close]);

	return (
		<Popup>
			<PopupContent
				icon={<TriangleAlert />}
				title={`Delete "${alias.name}"?`}
				description='This action cannot be undo.'
			/>
			<ButtonGroup smallPadding>
				<Button fill onClick={onClickDelete}>
					Delete
				</Button>
				<Button fill variant='secondary' onClick={close}>
					Cancel
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
