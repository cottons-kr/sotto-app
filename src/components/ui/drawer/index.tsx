import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { type PanInfo, motion } from 'motion/react';
import { useCallback } from 'react';
import type { OverlayProps } from '../overlay/types';
import { drawerVariants } from './animation';
import { drawer, handle } from './styles.css';

export interface DrawerProps extends BaseProps<HAS_CHILDREN> {}

export function Drawer(props: DrawerProps & OverlayProps) {
	const { children: drawerContent, close } = props;

	const onDragEnd = useCallback(
		(_: unknown, info: PanInfo) => {
			if (info.offset.y > 100) {
				close();
			}
		},
		[close],
	);

	return (
		<motion.div
			className={drawer}
			variants={drawerVariants}
			initial='hidden'
			animate='visible'
			exit='hidden'
			drag='y'
			dragConstraints={{ top: 0, bottom: 0 }}
			dragDirectionLock
			onDragEnd={onDragEnd}
		>
			<Container vertical='regular'>
				<Row justify='center'>
					<div className={handle} />
				</Row>
			</Container>
			{drawerContent}
		</motion.div>
	);
}
