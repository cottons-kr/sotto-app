import { Row } from '@/components/layout/row';
import { ExplorerLocationAliasPresets } from '@/components/pages/explorer/location-alias/presets';
import { ExplorerHeader } from '@/components/pages/explorer/shared/header';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { CompactListItem } from '@/components/ui/list/compact/item';
import { CompactListTitle } from '@/components/ui/list/compact/title';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Pencil, Plus, X } from 'lucide-react';

export default function ExplorerLocationAliasPage() {
	return (
		<>
			<TopNavigator
				leadingArea={<GoBack label='Profile' />}
				trailingArea={<Plus />}
			/>
			<ExplorerHeader title='Location Alias' count={2} />
			<ExplorerLocationAliasPresets />
			<PaddingDivider />
			<CompactListTitle title='Others' />
			<CompactListItem
				name='Hideout'
				description='somewhere'
				trailingArea={
					<Row gap={8} align='center'>
						<Pencil size={20} />
						<X size={20} />
					</Row>
				}
			/>
			<CompactListItem
				name='Friend’s home'
				description='address'
				trailingArea={
					<Row gap={8} align='center'>
						<Pencil size={20} />
						<X size={20} />
					</Row>
				}
			/>
		</>
	);
}
