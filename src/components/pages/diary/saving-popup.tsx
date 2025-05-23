import { Column } from '@/components/layout/column';
import { Typo } from '@/components/ui/typography';
import { getTransition } from '@/lib/animation';
import { LoaderCircle } from 'lucide-react';
import { type Variants, motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { backdrop, loaderCircle, popup } from './styles/saving-popup.css';

const backdropVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: getTransition(0.3),
	},
	visible: {
		opacity: 1,
		transition: getTransition(0.3),
	},
};

interface DiarySavingPopupProps {
	visible: boolean;
}

export function DiarySavingPopup(props: DiarySavingPopupProps) {
	const { visible } = props;

	const popupPortal = document.getElementById('popup-root');
	if (!popupPortal) {
		throw new Error('Popup root not found');
	}

	const children = (
		<>
			<motion.div
				className={backdrop}
				variants={backdropVariants}
				initial='hidden'
				animate='visible'
				exit='hidden'
			>
				<motion.div className={popup}>
					<Column align='center' gap={12}>
						<LoaderCircle className={loaderCircle} size={48} />
						<Typo.Body>Saving</Typo.Body>
					</Column>
				</motion.div>
			</motion.div>
		</>
	);

	return createPortal(visible ? children : null, popupPortal);
}
