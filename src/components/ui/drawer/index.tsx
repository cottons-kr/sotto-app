import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { motion } from 'motion/react';
import { useCallback, useContext } from 'react';
import { Overlay } from '../overlay';
import { drawerVariants } from './animation';
import { DrawerContext } from './context';
import { drawer, handle } from './styles/drawer.css';

interface DrawerProps extends BaseProps<HAS_CHILDREN> {
	id: string;
	preventBackdropClose?: boolean;
}

export function Drawer(props: DrawerProps) {
	const { id, preventBackdropClose, children: drawerContent } = props;
	const { currentDrawer, closeDrawer } = useContext(DrawerContext);

	const onClickBackdrop = useCallback(() => {
		if (id === currentDrawer && !preventBackdropClose) {
			closeDrawer();
		}
	}, [id, currentDrawer, closeDrawer, preventBackdropClose]);

	return (
		id === currentDrawer && (
			<Overlay id={`drawer-${id}`} close={onClickBackdrop}>
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
			</Overlay>
		)
	);
}
