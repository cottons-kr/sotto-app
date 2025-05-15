import { keyframes, style } from '@vanilla-extract/css';

export const centerSymbol = style({
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
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
