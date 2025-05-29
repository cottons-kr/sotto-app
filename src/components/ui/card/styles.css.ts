import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const card = uiStyle({
	width: '100%',
	backgroundColor: color.cream,
	borderRadius: 16,
	overflow: 'hidden',
	userSelect: 'none',
	WebkitUserSelect: 'none',
	transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
	':active': {
		transform: 'scale(0.98)',
		filter: 'brightness(0.9)',
	},
});

export const content = uiStyle({
	width: '100%',
	height: 120,
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
