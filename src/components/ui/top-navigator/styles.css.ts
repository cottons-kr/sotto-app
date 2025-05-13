import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const topNavigator = uiStyle({
	position: 'fixed',
	width: '100%',
	height: 'calc(48px + env(safe-area-inset-top))',
	padding: '0 16px',
	backgroundColor: color.milk,
	top: 0,
	left: 0,
	zIndex: 100,
});

export const content = uiStyle({
	height: 48,
});

export const spacer = uiStyle({
	height: 'calc(48px + env(safe-area-inset-top))',
	flexShrink: 0,
});
