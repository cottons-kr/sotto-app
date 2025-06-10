import { LocationPresetsAddDrawer } from '@/components/features/location/presets/add-drawer';
import { LocationPresetsEditDrawer } from '@/components/features/location/presets/edit-drawer';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import {
	type LocationPresetKey,
	locationManager,
} from '@/lib/managers/location';
import { color } from '@/styles/color.css';
import { fullHeight } from '@/styles/utils.css';
import { Building, House, School } from 'lucide-react';
import { useCallback } from 'react';
import { grid, item } from './styles/presets.css';

export function ExplorerLocationAliasPresets() {
	return (
		<Container className={grid}>
			<Item icon={<House size={32} />} name='home' />
			<Item icon={<House size={32} />} name='secondHome' />
			<Item icon={<School size={32} />} name='school' />
			<Item icon={<Building size={32} />} name='work' />
		</Container>
	);
}

interface ItemProps {
	icon: React.ReactNode;
	name: LocationPresetKey;
}

function Item(props: ItemProps) {
	const { icon, name } = props;

	const location = locationManager.getPresets()[name];
	const { show: openDrawer } = useOverlay(
		location ? LocationPresetsEditDrawer : LocationPresetsAddDrawer,
	);

	const onClick = useCallback(() => {
		openDrawer({ name });
	}, [name, openDrawer]);

	return (
		<Container className={item} onClick={onClick}>
			<Column className={fullHeight} gap={12} align='center' justify='center'>
				{icon}
				<Column gap={4} align='center'>
					<Typo.Lead weight='medium'>
						{locationManager.getPresetName(name)}
					</Typo.Lead>
					<Typo.Body color={color.sand}>
						{location?.address || 'Click to add'}
					</Typo.Body>
				</Column>
			</Column>
		</Container>
	);
}
