import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const wrapper = uiStyle({
	width: 80,
	height: 80,
	backgroundColor: color.cream,
	borderRadius: '50%',
	display: 'grid',
	placeItems: 'center',
	overflow: 'hidden',
});

export const input = uiStyle({
	position: 'absolute',
	top: -100,
	left: -100,
	width: 1,
	height: 1,
});

export const image = uiStyle({
	width: 80,
	height: 80,
	objectFit: 'cover',
	borderRadius: '50%',
	overflow: 'hidden',
});
