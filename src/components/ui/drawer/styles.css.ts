import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const drawer = uiStyle({
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: '100%',
	minHeight: 200,
	backgroundColor: color.milk,
	paddingBottom: 'env(safe-area-inset-bottom)',
	borderRadius: '32px 32px 0px 0px',
	boxShadow: '0px 0px 24px 8px rgba(0, 0, 0, 0.10)',
	'::after': {
		content: '""',
		position: 'absolute',
		width: '100%',
		height: 1000,
		backgroundColor: color.milk,
	},
});

export const handle = uiStyle({
	width: 60,
	height: 5,
	backgroundColor: color.sand,
	borderRadius: 1000,
});
