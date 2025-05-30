import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const popup = uiStyle({
	position: 'fixed',
	top: '50%',
	left: '50%',
	width: 'calc(100% - 32px)',
	padding: 16,
	backgroundColor: color.milk,
	borderRadius: 24,
	textAlign: 'center',
});

export const iconWrapper = uiStyle({
	width: 56,
	height: 56,
	aspectRatio: '1 / 1',
	padding: 16,
	backgroundColor: color.cream,
	borderRadius: '50%',
});
