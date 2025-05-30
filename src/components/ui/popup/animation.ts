import type { Variants } from 'motion/react';

export const variants: Variants = {
	hidden: {
		opacity: 0,
		transform: 'translate(-50%, -50%) scale(0.9)',
	},
	visible: {
		opacity: 1,
		transform: 'translate(-50%, -50%) scale(1)',
	},
};
