import { layoutStyle } from '@/styles/layer.css';

export const grid = layoutStyle({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 8,
});
