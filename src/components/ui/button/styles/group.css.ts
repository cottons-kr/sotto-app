import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const buttonGroup = uiStyle({
	width: '100%',
	padding: '8px 16px',
	backgroundColor: color.milk,
});

export const smallPaddingStyle = uiStyle({
	padding: 8,
});

export const bottomSafeAreaPaddingStyle = uiStyle({
	paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)',
});

export const floatStyle = uiStyle([
	bottomSafeAreaPaddingStyle,
	{
		position: 'fixed',
		bottom: 0,
	},
]);

export const transparentStyle = uiStyle({
	backgroundColor: 'transparent',
});
