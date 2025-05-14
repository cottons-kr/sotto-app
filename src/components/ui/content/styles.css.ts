import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const content = uiStyle({
	height: '100%',
});

export const iconStyle = uiStyle({
	display: 'grid',
	placeItems: 'center',
	width: 'fit-content',
	aspectRatio: '1 / 1',
	padding: 24,
	backgroundColor: color.cream,
	borderRadius: '50%',
});
