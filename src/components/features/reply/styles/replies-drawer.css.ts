import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const list = uiStyle({
	width: '100%',
	maxHeight: 400,
	overflowY: 'auto',
});

export const content = uiStyle({
	backgroundColor: color.cream,
	borderRadius: 16,
});
