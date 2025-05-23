import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const button = uiStyle({
	width: 'auto',
	display: 'flex',
	justifyContent: 'center',
	padding: 16,
	borderRadius: 16,
	userSelect: 'none',
	WebkitUserModify: 'read-only',
	WebkitUserSelect: 'none',
	transition: 'transform 0.2s ease, filter 0.2s ease',
	':active': {
		transform: 'scale(0.98)',
		filter: 'brightness(0.9)',
	},
	':disabled': {
		cursor: 'not-allowed',
		filter: 'brightness(0.85)',
		opacity: 0.6,
	},
});

export const variantStyles = {
	primary: uiStyle({
		backgroundColor: color.mud,
		color: color.milk,
	}),
	secondary: uiStyle({
		backgroundColor: color.cream,
	}),
	text: uiStyle({
		backgroundColor: 'transparent',
	}),
};

export const fillStyle = uiStyle({
	width: '100%',
});
