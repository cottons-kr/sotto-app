import { style } from '@vanilla-extract/css';

export const centerSymbol = style({
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
});
