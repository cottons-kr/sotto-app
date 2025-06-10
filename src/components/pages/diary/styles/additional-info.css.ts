import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const item = uiStyle({
	width: '100%',
	padding: '12px 0',
	backgroundColor: color.cream,
	borderRadius: 16,
	color: color.sand,
});

export const itemActive = uiStyle({
	color: color.mud,
});
