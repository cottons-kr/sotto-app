import { createGlobalTheme } from '@vanilla-extract/css';

export const color = createGlobalTheme(':root', {
	milk: 'hsla(27, 27%, 94%)',
	cream: 'hsla(38, 35%, 88%)',
	sand: 'hsla(38, 15%, 64%)',
	mud: 'hsla(31, 15%, 33%)',
});
