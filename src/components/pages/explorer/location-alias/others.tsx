import { LocationAliasDeleteConfirmPopup } from '@/components/features/location/alias/delete-confirm-popup';
import { LocationAliasEditDrawer } from '@/components/features/location/alias/edit-drawer';
import { Row } from '@/components/layout/row';
import { CompactListItem } from '@/components/ui/list/compact/item';
import { CompactListTitle } from '@/components/ui/list/compact/title';
import { useOverlay } from '@/hooks/use-overlay';
import { type Location, locationManager } from '@/lib/managers/location';
import { Pencil, X } from 'lucide-react';
import { useCallback } from 'react';

export function ExplorerLocationAliasOthers() {
	const aliases = locationManager.getAliases();

	return (
		<>
			<CompactListTitle title='Others' />
			{aliases.map((a) => (
				<Item key={a.uuid} alias={a} />
			))}
		</>
	);
}

interface ItemProps {
	alias: Location;
}

function Item(props: ItemProps) {
	const { alias } = props;

	const { show: openEdit } = useOverlay(LocationAliasEditDrawer);
	const { show: openDeleteConfirm } = useOverlay(
		LocationAliasDeleteConfirmPopup,
	);

	const onClickEdit = useCallback(() => {
		openEdit({ alias });
	}, [alias, openEdit]);

	const onClickDelete = useCallback(() => {
		openDeleteConfirm({ alias });
	}, [openDeleteConfirm, alias]);

	return (
		<CompactListItem
			key={alias.uuid}
			name={alias.name || alias.address}
			description={alias.name ? alias.address : undefined}
			trailingArea={
				<Row gap={8} align='center'>
					<Pencil size={20} onClick={onClickEdit} />
					<X size={20} onClick={onClickDelete} />
				</Row>
			}
		/>
	);
}
