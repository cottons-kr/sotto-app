import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const card = uiStyle({
	backgroundColor: color.cream,
	borderRadius: 16,
});

export const content = uiStyle({
	height: 100,
});

export const preview = uiStyle({
	opacity: 0.7,
});

export const date = uiStyle({
	textAlign: 'right',
});
