import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const card = uiStyle({
	backgroundColor: color.cream,
	borderRadius: 16,
	userSelect: 'none',
	WebkitUserSelect: 'none',
	transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
	':active': {
		transform: 'scale(0.98)',
		filter: 'brightness(0.9)',
	},
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
