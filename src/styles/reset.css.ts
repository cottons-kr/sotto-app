import { color } from './color.css';
import { resetGlobalStyle } from './layer.css';

resetGlobalStyle('html, body, #root', {
	width: '100%',
	height: 'var(--vh, 100vh)',
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
	width: '100%',
	color: 'inherit',
	cursor: 'pointer',
	textDecoration: 'none',
});

resetGlobalStyle('svg', {
	flexShrink: 0,
});

resetGlobalStyle('input, textarea, button', {
	fontFamily: 'inherit',
	color: 'inherit',
	background: 'transparent',
	border: 'none',
	outline: 'none',
});

resetGlobalStyle('input::placeholder, textarea::placeholder', {
	color: color.sand,
});

resetGlobalStyle('::-webkit-scrollbar', { display: 'none' });
