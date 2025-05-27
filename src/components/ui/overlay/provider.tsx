import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { type OverlayContent, OverlayContext } from './context';
import { root } from './styles.css';

interface OverlayProviderProps extends BaseProps<HAS_CHILDREN> {}

export function OverlayProvider(props: OverlayProviderProps) {
	const { children } = props;

	const domRef = useRef<HTMLDivElement | null>(null);
	const [contents, setContents] = useState<Array<OverlayContent>>([]);

	return (
		<OverlayContext value={{ dom: domRef.current, contents, setContents }}>
			{children}
			<div id='overlay-root' className={root} ref={domRef}>
				<AnimatePresence>{contents.map((c) => c.children)}</AnimatePresence>
			</div>
		</OverlayContext>
	);
}
