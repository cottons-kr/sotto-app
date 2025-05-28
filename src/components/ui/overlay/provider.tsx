import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { AnimatePresence } from 'motion/react';
import { useCallback, useState } from 'react';
import { type OverlayContent, OverlayContext } from './context';
import { root } from './styles.css';

interface OverlayProviderProps extends BaseProps<HAS_CHILDREN> {}

export function OverlayProvider(props: OverlayProviderProps) {
	const { children } = props;

	const [contents, setContents] = useState<Array<OverlayContent>>([]);

	const hideContent = useCallback((id: string) => {
		setContents((prev) => prev.filter((content) => content.id !== id));
	}, []);

	return (
		<OverlayContext value={{ contents, setContents }}>
			{children}
			<div className={root}>
				<AnimatePresence>
					{contents.map(({ id, Render }) => (
						<Render key={id} close={() => hideContent(id)} />
					))}
				</AnimatePresence>
			</div>
		</OverlayContext>
	);
}
