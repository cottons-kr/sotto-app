import {
	body,
	typography,
} from '@/components/ui/typography/styles/typography.css';
import { weightStyles } from '@/components/ui/typography/styles/weight.css';
import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const wrapper = uiStyle({
	width: '100%',
	height: 180,
	backgroundColor: color.cream,
	borderRadius: 16,
});

export const textArea = uiStyle([
	typography,
	body,
	weightStyles.medium,
	{
		height: '100%',
		':disabled': {
			opacity: 1,
		},
	},
]);
