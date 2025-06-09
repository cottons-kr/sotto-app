import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const cell = uiStyle({
	height: 76,
	borderRadius: 16,
	transition: 'background-color 0.2s ease',
});

export const selected = uiStyle({
	backgroundColor: color.cream,
});

export const date = uiStyle({
	width: 28,
	height: 28,
	display: 'grid',
	placeItems: 'center',
	borderRadius: 8,
});

export const today = uiStyle({
	backgroundColor: color.mud,
	color: color.milk,
});
