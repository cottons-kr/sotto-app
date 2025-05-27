import { getTransition } from '@/lib/animation';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { type Variants, motion } from 'motion/react';
import { useContext, useEffect, useMemo } from 'react';
import { OverlayContext } from './context';
import { backdrop } from './styles.css';

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

interface OverlayProps extends BaseProps<HAS_CHILDREN> {
	id: string;
	close?: () => unknown;
}

export function Overlay(props: OverlayProps) {
	const { id, children: propChildren, close } = props;
	const { setContents } = useContext(OverlayContext);
	const children = useMemo(() => {
		return (
			<>
				<motion.div
					className={backdrop}
					variants={backdropVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
					onClick={close}
				/>
				{propChildren}
			</>
		);
	}, [propChildren, close]);

	useEffect(() => {
		setContents((prev) => [{ id, children }, ...prev]);

		return () => {
			setContents((prev) => prev.filter((content) => content.id !== id));
		};
	}, [id, children, setContents]);

	return null;
}
