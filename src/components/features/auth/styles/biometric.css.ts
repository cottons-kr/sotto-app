import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const iconWrapper = uiStyle({
	height: 151,
});

export const icon = uiStyle({
	width: 96,
	height: 96,
	aspectRatio: '1 / 1',
	display: 'grid',
	placeItems: 'center',
	backgroundColor: color.cream,
	borderRadius: '50%',
});
