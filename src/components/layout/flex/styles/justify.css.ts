import { layoutStyle } from '@/styles/layer.css';

export const justifyStyles = {
	start: layoutStyle({
		justifyContent: 'flex-start',
	}),
	center: layoutStyle({
		justifyContent: 'center',
	}),
	end: layoutStyle({
		justifyContent: 'flex-end',
	}),
	'space-between': layoutStyle({
		justifyContent: 'space-between',
	}),
	'space-around': layoutStyle({
		justifyContent: 'space-around',
	}),
	'space-evenly': layoutStyle({
		justifyContent: 'space-evenly',
	}),
} as const;
