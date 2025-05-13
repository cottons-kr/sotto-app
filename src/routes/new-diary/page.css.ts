import {
	body,
	title,
	typography,
} from '@/components/ui/typography/styles/typography.css';
import { weightStyles } from '@/components/ui/typography/styles/weight.css';
import { style } from '@vanilla-extract/css';

export const page = style({
	height: '100%',
});

export const titleInput = style([typography, title, weightStyles.strong]);

export const textAreaContainer = style({
  height: '100%',
})

export const textArea = style([
	typography,
	body,
	weightStyles.medium,
	{
		height: '100%',
	},
]);
