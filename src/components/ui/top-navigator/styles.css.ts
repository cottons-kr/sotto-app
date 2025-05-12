import { uiStyle } from '@/styles/layer.css';

export const topNavigator = uiStyle({
	position: 'fixed',
	width: '100%',
	height: 'calc(48px + env(safe-area-inset-top))',
	padding: '0 16px',
	top: 0,
	left: 0,
});

export const content = uiStyle({
	height: 48,
});

export const spacer = uiStyle({
	height: 'calc(48px + env(safe-area-inset-top))',
});
