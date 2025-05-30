import { fontFace, globalFontFace } from '@vanilla-extract/css';
import { resetGlobalStyle } from './layer.css';

const WANTED_SANS_VARIABLE = 'WANTED_SANS_VARIABLE';

globalFontFace(WANTED_SANS_VARIABLE, {
	src: `url('/fonts/WantedSansVariable.woff2') format('woff2'), url('/fonts/WantedSansVariable.woff') format('woff')`,
});

resetGlobalStyle('html, body', {
	fontFamily: WANTED_SANS_VARIABLE,
});

export const FIRA_CODE = fontFace({
	src: `url('/fonts/FiraCode-Medium.woff2') format('woff2'), url('/fonts/FiraCode-Medium.woff') format('woff')`,
});
