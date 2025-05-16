import { Container } from '@/components/layout/container';
import { Typo } from '@/components/ui/typography';
import { getTransition } from '@/lib/animation';
import { AnimatePresence, type Variants, motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { toast } from './styles/saving-toast.css';

const variants: Variants = {
	hidden: {
		opacity: 0,
		top: 'calc(env(safe-area-inset-top) + 8px)',
		transition: getTransition(0.3),
	},
	visible: {
		opacity: 1,
		top: 'calc(env(safe-area-inset-top) + 24px)',
		transition: getTransition(0.3),
	},
};

interface DiarySavingToastProps {
	visible: boolean;
}

export function DiarySavingToast(props: DiarySavingToastProps) {
	const { visible } = props;

	const toastPortal = document.getElementById('toast-root');
	if (!toastPortal) {
		throw new Error('Toast root not found');
	}

	const children = (
		<AnimatePresence>
			{visible && (
				<motion.div
					className={toast}
					variants={variants}
					initial='hidden'
					animate='visible'
					exit='hidden'
				>
					<Container vertical='regular'>
						<Typo.Body>Saving...</Typo.Body>
					</Container>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return createPortal(children, toastPortal);
}
