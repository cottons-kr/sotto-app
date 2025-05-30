import { getTransition } from '@/lib/animation';
import type { Variants } from 'motion/react';

export const drawerVariants: Variants = {
	hidden: {
		y: '100%',
		transition: getTransition(0.35),
	},
	visible: {
		y: 0,
		transition: getTransition(0.35),
	},
};
