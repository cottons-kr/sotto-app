import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { motion } from 'motion/react';
import { variants } from './animation';
import { popup } from './styles.css';

export function Popup(props: BaseProps<HAS_CHILDREN>) {
	const { children } = props;

	return (
		<motion.div
			className={popup}
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='hidden'
		>
			{children}
		</motion.div>
	);
}
