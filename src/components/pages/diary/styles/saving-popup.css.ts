import { color } from '@/styles/color.css';
import { keyframes, style } from '@vanilla-extract/css';

export const backdrop = style({
	position: 'fixed',
	top: 0,
	left: 0,
	display: 'grid',
	placeItems: 'center',
	width: '100%',
	height: '100vh',
	backgroundColor: 'rgba(0, 0, 0, 0.25)',
	zIndex: 1000,
});

export const popup = style({
	padding: '16px 24px',
	backgroundColor: color.milk,
	borderRadius: 24,
	zIndex: 1000,
});

const loading = keyframes({
	'0%': {
		transform: 'rotate(0deg)',
	},
	'100%': {
		transform: 'rotate(360deg)',
	},
});

export const loaderCircle = style({
	animation: `${loading} 1s linear infinite`,
});
