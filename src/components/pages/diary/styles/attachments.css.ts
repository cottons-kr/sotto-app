import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const list = uiStyle({
	width: '100%',
	height: 148,
	minHeight: 148,
	overflowX: 'auto',
});

export const input = uiStyle({
	width: 0,
	height: 0,
	position: 'absolute',
	top: -9999,
	left: -9999,
});

export const image = uiStyle({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	userSelect: 'none',
	WebkitUserModify: 'read-only',
	WebkitTouchCallout: 'none',
});

export const item = uiStyle({
	width: 160,
	height: 100,
	backgroundColor: color.cream,
	flexShrink: 0,
	borderRadius: 16,
	overflow: 'hidden',
});
