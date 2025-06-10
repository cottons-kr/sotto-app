import { LocationAliasAddDrawer } from '@/components/features/location/alias/add-drawer';
import { ExplorerLocationAliasOthers } from '@/components/pages/explorer/location-alias/others';
import { ExplorerLocationAliasPresets } from '@/components/pages/explorer/location-alias/presets';
import { ExplorerHeader } from '@/components/pages/explorer/shared/header';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { useOverlay } from '@/hooks/use-overlay';
import { locationManager } from '@/lib/managers/location';
import { Plus } from 'lucide-react';

export default function ExplorerLocationAliasPage() {
	const { show: openAddAlias } = useOverlay(LocationAliasAddDrawer);

	return (
		<>
			<TopNavigator
				leadingArea={<GoBack label='Profile' />}
				trailingArea={<Plus onClick={openAddAlias} />}
			/>
			<ExplorerHeader
				title='Location Alias'
				count={locationManager.getSavedCount()}
			/>
			<ExplorerLocationAliasPresets />
			<PaddingDivider />
			<ExplorerLocationAliasOthers />
		</>
	);
}
