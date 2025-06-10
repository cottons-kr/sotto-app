import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const grid = uiStyle({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 8,
});

export const item = uiStyle({
	backgroundColor: color.cream,
	borderRadius: 16,
});
