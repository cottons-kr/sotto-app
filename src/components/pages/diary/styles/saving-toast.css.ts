import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const toast = uiStyle({
	position: 'fixed',
	right: '50%',
	transform: 'translateX(50%)',
	backgroundColor: color.cream,
	borderRadius: 22,
	zIndex: 500,
});
