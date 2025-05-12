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
}

export function Drawer(props: DrawerProps) {
	const { id, children: drawerContent } = props;
	const { currentDrawer, closeDrawer } = useContext(DrawerContext);

	const drawerPortal = document.getElementById('drawer-root');
	if (!drawerPortal) {
		throw new Error('Drawer root not found');
	}

	const onClickBackdrop = useCallback(() => {
		if (id === currentDrawer) {
			closeDrawer();
		}
	}, [id, currentDrawer, closeDrawer]);

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
					>
						<Container vertical='medium'>
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
