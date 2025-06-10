import { DiaryLocationDrawer } from '@/components/features/diary/location-drawer';
import { DiaryWeatherDrawer } from '@/components/features/diary/weather-drawer';
import { Row } from '@/components/layout/row';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { cn } from '@/lib/common';
import { getWeatherIcon, getWeatherLabel } from '@/lib/weather';
import { MapPin } from 'lucide-react';
import { useCallback, useContext } from 'react';
import { DiaryContext } from './context';
import { item, itemActive } from './styles/additional-info.css';

export function DiaryAdditionalInfo() {
	const {
		diary,
		diaryDispatch: { setLocation, setWeather },
	} = useContext(DiaryContext);
	const WeatherIcon = getWeatherIcon(diary.weather);

	const { show: openLocation } = useOverlay(DiaryLocationDrawer);
	const { show: openWeather } = useOverlay(DiaryWeatherDrawer);

	const onClickLocation = useCallback(() => {
		openLocation({ setLocation });
	}, [setLocation, openLocation]);

	const onClickWeather = useCallback(() => {
		openWeather({ setWeather });
	}, [setWeather, openWeather]);

	return (
		<Row gap={8}>
			<Row
				className={cn(item, diary.location && itemActive)}
				gap={6}
				align='center'
				onClick={onClickLocation}
			>
				<MapPin size={20} />
				<Typo.Body weight='medium'>
					{diary.location || 'Add location'}
				</Typo.Body>
			</Row>
			<Row
				className={cn(item, diary.weather && itemActive)}
				gap={6}
				align='center'
				onClick={onClickWeather}
			>
				<WeatherIcon size={20} />
				<Typo.Body weight='medium'>
					{diary.weather ? getWeatherLabel(diary.weather) : 'Add weather'}
				</Typo.Body>
			</Row>
		</Row>
	);
}
