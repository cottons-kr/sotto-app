import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const item = style({
	width: 100,
});

export const avatar = style({
	position: 'relative',
	width: 'fit-content',
	height: 'fit-content',
});

export const check = style({
	position: 'absolute',
	bottom: 0,
	right: 0,
	display: 'grid',
	placeItems: 'center',
	padding: 4,
	backgroundColor: color.mud,
	borderRadius: '50%',
	color: color.milk,
});
