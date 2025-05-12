import { color } from './color.css';
import { resetGlobalStyle } from './layer.css';

resetGlobalStyle('html, body, #root', {
	width: '100%',
	height: '100vh',
	backgroundColor: color.milk,
	color: color.mud,
	wordBreak: 'keep-all',
	wordWrap: 'break-word',
	textWrap: 'pretty',
	scrollBehavior: 'smooth',
});

resetGlobalStyle('*', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
	fontSynthesis: 'none',
	WebkitFontSmoothing: 'antialiased',
	textRendering: 'optimizeLegibility',
	shapeRendering: 'geometricPrecision',
	WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
});

resetGlobalStyle('*:focus', { outline: 'none' });

resetGlobalStyle('a', {
	color: 'inherit',
	cursor: 'pointer',
	textDecoration: 'none',
});

resetGlobalStyle('svg', {
	width: 24,
	height: 24,
	flexShrink: 0,
});

resetGlobalStyle('input, textarea, button', {
	fontFamily: 'inherit',
	color: 'inherit',
	background: 'transparent',
	border: 'none',
	outline: 'none',
});

resetGlobalStyle('::-webkit-scrollbar', { display: 'none' });
