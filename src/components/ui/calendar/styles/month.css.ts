import { uiStyle } from '@/styles/layer.css';

export const monthGrid = uiStyle({
	width: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gridTemplateRows: 'repeat(5, 1fr)',
});
