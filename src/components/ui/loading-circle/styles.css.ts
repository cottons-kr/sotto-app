import { uiStyle } from '@/styles/layer.css';
import { keyframes } from '@vanilla-extract/css';

const loading = keyframes({
	'0%': {
		transform: 'rotate(0deg)',
	},
	'100%': {
		transform: 'rotate(360deg)',
	},
});

export const wrapper = uiStyle({
	
})

export const loaderCircle = uiStyle({
	aspectRatio: '1 / 1',
	animation: `${loading} 1s linear infinite`,
});
