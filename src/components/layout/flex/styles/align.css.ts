import { layoutStyle } from '@/styles/layer.css';

export const alignStyles = {
	start: layoutStyle({
		alignItems: 'flex-start',
	}),
	center: layoutStyle({
		alignItems: 'center',
	}),
	end: layoutStyle({
		alignItems: 'flex-end',
	}),
	stretch: layoutStyle({
		alignItems: 'stretch',
	}),
} as const;
