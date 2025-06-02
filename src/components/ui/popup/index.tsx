import { cn } from '@/lib/common';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { motion } from 'motion/react';
import { variants } from './animation';
import { fillPopup, popup } from './styles.css';

interface PopupProps extends BaseProps<HAS_CHILDREN> {
	fill?: boolean;
}

export function Popup(props: PopupProps) {
	const { fill = true, className, children } = props;

	return (
		<motion.div
			className={cn(popup, className, { [fillPopup]: fill })}
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='hidden'
		>
			{children}
		</motion.div>
	);
}
