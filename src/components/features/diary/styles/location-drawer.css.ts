import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const aliasList = uiStyle({
	width: '100%',
	overflowX: 'auto',
});

export const aliasItem = uiStyle({
	flexShrink: 0,
});

export const aliasIcon = uiStyle({
	width: 44,
	height: 44,
	display: 'grid',
	placeItems: 'center',
	backgroundColor: color.cream,
	borderRadius: '50%',
});
