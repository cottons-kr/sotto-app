import {
	Cloud,
	CloudDrizzle,
	CloudFog,
	CloudRainWind,
	Snowflake,
	Sun,
	Wind,
	Zap,
} from 'lucide-react';

export type Weather =
	| 'sunny'
	| 'cloudy'
	| 'rainy'
	| 'windy'
	| 'snowy'
	| 'foggy'
	| 'stormy'
	| 'drizzle';

export const weatherList: Array<Weather> = [
	'sunny',
	'cloudy',
	'rainy',
	'windy',
	'snowy',
	'foggy',
	'stormy',
	'drizzle',
];

export function getWeatherIcon(weather?: Weather) {
	switch (weather) {
		case 'sunny':
			return Sun;
		case 'cloudy':
			return Cloud;
		case 'rainy':
			return CloudRainWind;
		case 'windy':
			return Wind;
		case 'snowy':
			return Snowflake;
		case 'foggy':
			return CloudFog;
		case 'stormy':
			return Zap;
		case 'drizzle':
			return CloudDrizzle;
		default:
			return Cloud;
	}
}

export function getWeatherLabel(weather: Weather) {
	switch (weather) {
		case 'sunny':
			return 'Sunny';
		case 'cloudy':
			return 'Cloudy';
		case 'rainy':
			return 'Rainy';
		case 'windy':
			return 'Windy';
		case 'snowy':
			return 'Snowy';
		case 'foggy':
			return 'Foggy';
		case 'stormy':
			return 'Stormy';
		case 'drizzle':
			return 'Drizzle';
		default:
			return 'Sunny';
	}
}
