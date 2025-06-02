import { color } from '@/styles/color.css';
import { style } from '@vanilla-extract/css';

export const friendList = style({
	height: 204,
	display: 'grid',
	gridAutoFlow: 'column',
	gridTemplateRows: 'repeat(2, 1fr)',
	gridAutoColumns: '100px',
	gap: 24,
	padding: '12px 16px',
	overflowX: 'scroll',
});

export const empty = style({
	height: 204,
});

export const emptyIcon = style({
	width: 'fit-content',
	aspectRatio: '1 / 1',
	backgroundColor: color.cream,
	borderRadius: '50%',
	display: 'grid',
	placeItems: 'center',
});
