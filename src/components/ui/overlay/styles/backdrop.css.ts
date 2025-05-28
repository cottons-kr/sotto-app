import { style } from '@vanilla-extract/css';

export const backdrop = style({
	position: 'fixed',
	width: '100%',
	height: '100vh',
	top: 0,
	left: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.25)',
});
