import { layoutStyle } from '@/styles/layer.css';

export const flex = layoutStyle({
	display: 'flex',
});

export const noGrow = layoutStyle({
	flexGrow: 0,
});

export const noShrink = layoutStyle({
	flexShrink: 0,
});
