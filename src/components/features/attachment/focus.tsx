import type { OverlayProps } from '@/components/ui/overlay/types';
import { useOverlay } from '@/hooks/use-overlay';
import { getTransition } from '@/lib/animation';
import { Trash } from 'lucide-react';
import { type Variants, motion } from 'motion/react';
import { useCallback } from 'react';
import { AttachmentDeletePopup } from './delete-popup';
import { deleteButton, image } from './styles/focus.css';

const imageVariants: Variants = {
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
		transition: getTransition(0.35),
	},
};

const buttonVariants: Variants = {
	hidden: {
		x: '50%',
		opacity: 0,
		scale: 0.95,
	},
	visible: {
		x: '50%',
		opacity: 1,
		scale: 1,
		transition: getTransition(0.35),
	},
};

interface AttachmentFocusProps {
	previewUrl: string;
	handleDelete: () => unknown;
}

export function AttachmentFocus(props: AttachmentFocusProps & OverlayProps) {
	const { previewUrl, handleDelete, close } = props;

	const { show: openDelete } = useOverlay(AttachmentDeletePopup);

	const onClickDelete = useCallback(() => {
		openDelete({ handleDelete });
	}, [openDelete, handleDelete]);

	return (
		<>
			<motion.img
				className={image}
				src={previewUrl}
				alt='Preview'
				draggable={false}
				variants={imageVariants}
				initial='hidden'
				animate='visible'
				exit='hidden'
				onClick={close}
			/>
			<motion.button
				type='button'
				className={deleteButton}
				variants={buttonVariants}
				initial='hidden'
				animate='visible'
				exit='hidden'
				onClick={onClickDelete}
			>
				<Trash />
			</motion.button>
		</>
	);
}
