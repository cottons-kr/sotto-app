import { layoutStyle } from '@/styles/layer.css';

export const wrapStyles = {
	nowrap: layoutStyle({
		flexWrap: 'nowrap',
	}),
	wrap: layoutStyle({
		flexWrap: 'wrap',
	}),
	'wrap-reverse': layoutStyle({
		flexWrap: 'wrap-reverse',
	}),
} as const;
