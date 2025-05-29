import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const avatarContainer = style({
	display: 'flex',
	justifyContent: 'center',
});

export const stat = style({
	width: '100%',
	backgroundColor: color.cream,
	borderRadius: 16,
});
