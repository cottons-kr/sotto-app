import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const list = uiStyle({
	width: '100%',
	height: 148,
	minHeight: 148,
	overflowX: 'auto',
});

export const item = uiStyle({
	width: 160,
	height: 100,
	backgroundColor: color.cream,
	flexShrink: 0,
	borderRadius: 16,
});
