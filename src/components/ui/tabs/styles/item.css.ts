import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const group = style({
	width: '100%',
	padding: '0 16px',
});

export const item = style({
	width: '100%',
	padding: '8px 24px',
	color: color.sand,
});

export const itemActive = style({
	color: color.mud,
});
