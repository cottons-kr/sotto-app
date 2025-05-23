import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const avatar = style({
	position: 'relative',
	width: 72,
	height: 72,
	aspectRatio: '1 / 1',
});

export const edit = style({
	position: 'absolute',
	bottom: 0,
	right: 0,
	width: 28,
	height: 28,
	aspectRatio: '1 / 1',
	display: 'grid',
	placeItems: 'center',
	backgroundColor: color.mud,
	borderRadius: '50%',
});
