import { uiStyle } from '@/styles/layer.css';
import { weightStyles } from './weight.css';

export const typography = uiStyle([
	weightStyles.regular,
	{
		letterSpacing: '-3.75%',
	},
]);

export const typographyFill = uiStyle({
	width: '100%',
	display: 'block',
});

export const title = uiStyle({
	fontSize: 32,
});

export const lead = uiStyle({
	fontSize: 20,
});

export const body = uiStyle({
	fontSize: 16,
});

export const caption = uiStyle({
	fontSize: 14,
});
