import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useContext } from 'react';
import { createPortal } from 'react-dom';
import { backdropVariants, drawerVariants } from './animation';
import { DrawerContext } from './context';
import { backdrop } from './styles/backdrop.css';
import { drawer, handle } from './styles/drawer.css';

interface DrawerProps extends BaseProps<HAS_CHILDREN> {
	id: string;
	preventBackdropClose?: boolean;
}

export function Drawer(props: DrawerProps) {
	const { id, preventBackdropClose, children: drawerContent } = props;
	const { currentDrawer, closeDrawer } = useContext(DrawerContext);

	const drawerPortal = document.getElementById('drawer-root');
	if (!drawerPortal) {
		throw new Error('Drawer root not found');
	}

	const onClickBackdrop = useCallback(() => {
		if (id === currentDrawer && !preventBackdropClose) {
			closeDrawer();
		}
	}, [id, currentDrawer, closeDrawer, preventBackdropClose]);

	const children = (
		<AnimatePresence>
			{id === currentDrawer && (
				<>
					<motion.div
						className={backdrop}
						variants={backdropVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						onClick={onClickBackdrop}
					/>
					<motion.div
						className={drawer}
						variants={drawerVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						drag='y'
						dragConstraints={{ top: 0, bottom: 0 }}
						dragDirectionLock
						onDragEnd={(_, { offset }) => {
							if (offset.y > 100) {
								closeDrawer();
							}
						}}
					>
						<Container vertical='regular'>
							<Row justify='center'>
								<div className={handle} />
							</Row>
						</Container>
						{drawerContent}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);

	return createPortal(children, drawerPortal);
}
