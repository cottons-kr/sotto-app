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

export const item = style({
	width: 100,
});

export const avatar = style({
	position: 'relative',
	width: 'fit-content',
	height: 'fit-content',
});

export const check = style({
	position: 'absolute',
	bottom: 0,
	right: 0,
	display: 'grid',
	placeItems: 'center',
	padding: 4,
	backgroundColor: color.mud,
	borderRadius: '50%',
	color: color.milk,
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
