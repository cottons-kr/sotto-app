import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const navigator = style({
	width: '100%',
	padding: 8,
	backgroundColor: color.milk,
	borderRadius: 24,
	boxShadow: '0px 4px 16px 2px rgba(97, 85, 72, 0.12)',
});

export const addButton = style({
	width: 48,
	height: 48,
	backgroundColor: color.mud,
	color: color.milk,
	borderRadius: 16,
	flexShrink: 0,
});

export const viewButton = style({
	width: '100%',
	height: 48,
	color: color.sand,
	borderRadius: 16,
	transition: 'background-color 0.2s ease, color 0.2s ease',
});

export const viewButtonActive = style({
	backgroundColor: color.cream,
	color: color.mud,
});
