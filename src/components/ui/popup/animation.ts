import { getTransition } from '@/lib/animation';
import type { Variants } from 'motion/react';

export const variants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
		x: '-50%',
		y: 'calc(-50% + 20px)',
		transition: getTransition(0.3),
	},
	visible: {
		opacity: 1,
		scale: 1,
		x: '-50%',
		y: '-50%',
		transition: getTransition(0.3),
	},
};
