import './styles/root.css';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { AnimatePresence } from 'motion/react';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { OverlayContext } from './context';
import { OverlayRenderer } from './renderer';
import type { OverlayContent } from './types';

interface OverlayProviderProps extends BaseProps<HAS_CHILDREN> {}

export function OverlayProvider(props: OverlayProviderProps) {
	const { children: providerChildren } = props;

	const [contents, setContents] = useState<Array<OverlayContent>>([]);

	const hideContent = useCallback((id: string) => {
		setContents((prev) => prev.filter((content) => content.id !== id));
	}, []);

	const overlayRoot = document.getElementById('overlay-root');
	if (!overlayRoot) {
		throw new Error('Overlay root element not found.');
	}

	return (
		<OverlayContext value={{ contents, setContents }}>
			{providerChildren}
			{createPortal(
				<AnimatePresence>
					{contents.map((c) => (
						<OverlayRenderer
							key={c.id}
							content={c}
							close={() => hideContent(c.id)}
						/>
					))}
				</AnimatePresence>,
				overlayRoot,
			)}
		</OverlayContext>
	);
}
