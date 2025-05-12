import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';
import { body } from '../typography/styles/typography.css';

export const input = uiStyle([
	body,
	{
		padding: '12px 16px',
		backgroundColor: color.cream,
		borderRadius: 16,
	},
]);
