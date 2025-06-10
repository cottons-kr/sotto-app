import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import {
	type Weather,
	getWeatherIcon,
	getWeatherLabel,
	weatherList,
} from '@/lib/weather';
import { useCallback } from 'react';
import { grid, item } from './styles/weather-drawer.css';

interface DiaryWeatherDrawerProps {
	setWeather: (weather: Weather) => unknown;
}

export function DiaryWeatherDrawer(props: DiaryWeatherDrawerProps & OverlayProps) {
	const { setWeather, close } = props;

	return (
		<Drawer close={close}>
			<DrawerTitle>Add weather</DrawerTitle>
			<Container>
				<div className={grid}>
					{weatherList.map((w) => (
						<Item key={w} weather={w} setWeather={setWeather} close={close} />
					))}
				</div>
			</Container>
		</Drawer>
	);
}

interface ItemProps {
	weather: Weather;
	setWeather: (weather: Weather) => unknown;
	close: () => void;
}

function Item(props: ItemProps) {
	const { weather, setWeather, close } = props;
	const Icon = getWeatherIcon(weather);

	const onClick = useCallback(() => {
		setWeather(weather);
		close();
	}, [setWeather, weather, close]);

	return (
		<Container className={item} onClick={onClick}>
			<Row gap={8} align='center'>
				<Icon size={20} />
				<Typo.Body weight='medium'>{getWeatherLabel(weather)}</Typo.Body>
			</Row>
		</Container>
	);
}
