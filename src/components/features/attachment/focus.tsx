import type { OverlayProps } from '@/components/ui/overlay/types';
import { getTransition } from '@/lib/animation';
import { type Variants, motion } from 'motion/react';
import { image } from './styles/focus.css';

const variants: Variants = {
	hidden: {
		x: '-50%',
		y: '-50%',
		opacity: 0,
		scale: 0.95,
	},
	visible: {
		x: '-50%',
		y: '-50%',
		opacity: 1,
		scale: 1,
		transition: getTransition(),
	},
};

interface AttachmentFocusProps {
	previewUrl: string;
}

export function AttachmentFocus(props: AttachmentFocusProps & OverlayProps) {
	const { previewUrl, close } = props;

	return (
		<motion.img
			className={image}
			src={previewUrl}
			alt='Preview'
			draggable={false}
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='hidden'
			onClick={close}
		/>
	);
}
