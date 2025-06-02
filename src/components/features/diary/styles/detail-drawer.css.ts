import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const card = uiStyle({
	width: '100%',
	backgroundColor: color.cream,
	borderRadius: 16,
});

export const preventOverflow = uiStyle({
	width: '100%',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

export const title = uiStyle([preventOverflow]);

export const preview = uiStyle([
	preventOverflow,
	{
		opacity: 0.7,
	},
]);
