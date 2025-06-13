import { color } from '@/styles/color.css';
import { uiStyle } from '@/styles/layer.css';

export const image = uiStyle({
	position: 'fixed',
	maxWidth: 'calc(100% - 32px)',
	maxHeight: '50vh',
	borderRadius: 16,
	userSelect: 'none',
	WebkitUserModify: 'read-only',
	WebkitTouchCallout: 'none',
	top: '50%',
	left: '50%',
});

export const deleteButton = uiStyle({
	position: 'fixed',
	width: 48,
	height: 48,
	backgroundColor: color.cream,
	borderRadius: '50%',
	right: '50%',
	bottom: 64,
});
