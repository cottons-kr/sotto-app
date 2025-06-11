import { uiStyle } from '@/styles/layer.css';

export const input = uiStyle({
	height: 32,
});

export const placeholderStyle = uiStyle({
	opacity: 0.5,
});

export const emojiContainer = uiStyle({
	height: '50vh',
	overflowY: 'auto',
});

export const emojiGrid = uiStyle({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
	gap: 8,
});

export const emojiButton = uiStyle({
	width: '100%',
	aspectRatio: '1 / 1',
	display: 'grid',
	placeItems: 'center',
});
