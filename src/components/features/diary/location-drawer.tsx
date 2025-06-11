import { AppContext } from '@/App';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { Input } from '@/components/ui/input';
import { CompactListItem } from '@/components/ui/list/compact/item';
import { CompactListTitle } from '@/components/ui/list/compact/title';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { type Location, locationManager } from '@/lib/managers/location';
import { color } from '@/styles/color.css';
import { MapPinned, X } from 'lucide-react';
import { useCallback, useContext, useState } from 'react';
import { aliasIcon, aliasItem, aliasList } from './styles/location-drawer.css';

interface LocationDrawerProps {
	setLocation: (location: string) => void;
}

export function DiaryLocationDrawer(props: LocationDrawerProps & OverlayProps) {
	const { setLocation: setDiaryLocation, close } = props;

	const { forceUpdate } = useContext(AppContext);
	const [address, setAddress] = useState('');

	const onClickItem = useCallback(
		(location: Location) => {
			setAddress(location.name || location.address);
			setDiaryLocation(location.name || location.address);
			close();
			setTimeout(() => {
				locationManager.addHistory(location);
			}, 200);
		},
		[setDiaryLocation, close],
	);

	const onClickClearHistory = useCallback(async () => {
		await locationManager.clearHistory();
		forceUpdate();
	}, [forceUpdate]);

	const onClickAdd = useCallback(() => {
		setDiaryLocation(address);
		close();
		setTimeout(() => {
			locationManager.addHistory(address);
		}, 200);
	}, [setDiaryLocation, address, close]);

	return (
		<Drawer close={close}>
			<DrawerTitle>Add location</DrawerTitle>
			<Container vertical='small'>
				<Input
					placeholder='Enter your address'
					value={address}
					onValue={setAddress}
				/>
			</Container>
			<Container vertical='small' horizontal='regular'>
				<Row className={aliasList} gap={4} align='center' justify='start'>
					{locationManager.getPresetKeys().map((presetKey) => {
						const location = locationManager.getPresetLocation(presetKey);
						if (!location) return null;
						return (
							<AliasItem
								key={presetKey}
								icon={locationManager.getPresetIcon(presetKey)}
								name={locationManager.getPresetName(presetKey)}
								onClick={() => onClickItem(location)}
							/>
						);
					})}
					{locationManager.getAliases().map((alias) => (
						<AliasItem
							key={alias.uuid}
							name={alias.name || alias.address}
							onClick={() => onClickItem(alias)}
						/>
					))}
				</Row>
			</Container>
			<PaddingDivider />
			<CompactListTitle
				title='Recent locations'
				trailingArea={
					<Typo.Caption color={color.sand} onClick={onClickClearHistory}>
						Clear
					</Typo.Caption>
				}
			/>
			{locationManager.getHistory().map((history) => (
				<CompactListItem
					key={history.uuid}
					name={history.name || history.address}
					description={history.name ? history.address : undefined}
					onClick={() => onClickItem(history)}
					trailingArea={<X size={20} />}
				/>
			))}
			<ButtonGroup>
				<Button fill onClick={onClickAdd}>
					Add
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}

interface AliasItemProps {
	icon?: typeof MapPinned;
	name: string;
	onClick?: () => void;
}

function AliasItem(props: AliasItemProps) {
	const { icon: Icon, name, onClick } = props;

	return (
		<Container
			className={aliasItem}
			vertical='none'
			horizontal='small'
			onClick={onClick}
		>
			<Column gap={4} align='center'>
				<div className={aliasIcon}>
					{Icon ? <Icon size={20} /> : <MapPinned size={20} />}
				</div>
				<Typo.Caption>{name}</Typo.Caption>
			</Column>
		</Container>
	);
}
