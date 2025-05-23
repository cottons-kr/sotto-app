import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const centered = style({
	display: 'grid',
	placeItems: 'center',
});

export const iconWrapper = style([
	centered,
	{
		width: 56,
		height: 56,
		backgroundColor: color.cream,
		borderRadius: '50%',
	},
]);
