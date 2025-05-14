import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const wrapper = uiStyle({
	position: 'relative',
});

export const input = uiStyle({
	position: 'absolute',
	width: '100%',
	height: '100%',
	opacity: 0,
});

export const item = uiStyle({
	width: 45,
	padding: 12,
	backgroundColor: color.cream,
	border: `1.5px solid ${color.sand}`,
	borderRadius: 16,
	color: color.sand,
});

export const itemActive = uiStyle({
	borderColor: color.mud,
	color: color.mud,
});
