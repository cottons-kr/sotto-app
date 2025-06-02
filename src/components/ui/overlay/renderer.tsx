import { getTransition } from '@/lib/animation';
import { type Variants, motion } from 'motion/react';
import { type MouseEvent, useCallback } from 'react';
import { backdrop } from './styles/backdrop.css';
import type { OverlayContent } from './types';

const backdropVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: getTransition(),
	},
	visible: {
		opacity: 1,
		transition: getTransition(),
	},
};

interface OverlayRendererProps {
	content: OverlayContent;
	close: () => void;
}

export function OverlayRenderer(props: OverlayRendererProps) {
	const { content, close } = props;
	const { render: Render, options } = content;

	const onClickBackdrop = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();
			if (options?.onClickBackdrop) {
				options.onClickBackdrop();
			}
			if (!options?.preventBackdropClose) {
				close();
			}
		},
		[close, options],
	);

	return (
		<>
			<motion.div
				className={backdrop}
				variants={backdropVariants}
				initial='hidden'
				animate='visible'
				exit='hidden'
				onClick={onClickBackdrop}
			/>
			<Render key={content.id} close={close} />
		</>
	);
}
