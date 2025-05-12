import { layoutStyle } from '@/styles/layer.css';

export const directionStyles = {
	row: layoutStyle({
		flexDirection: 'row',
	}),
	'row-reverse': layoutStyle({
		flexDirection: 'row-reverse',
	}),
	column: layoutStyle({
		flexDirection: 'column',
	}),
	'column-reverse': layoutStyle({
		flexDirection: 'column-reverse',
	}),
} as const;
