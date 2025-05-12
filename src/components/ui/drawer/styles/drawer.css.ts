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
});

export const handle = uiStyle({
	width: 60,
	height: 5,
	backgroundColor: color.sand,
	borderRadius: 1000,
});
