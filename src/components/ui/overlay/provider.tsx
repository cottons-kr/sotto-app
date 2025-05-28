import './styles/root.css';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { AnimatePresence } from 'motion/react';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { type OverlayContent, OverlayContext } from './context';

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

	const children = (
		<AnimatePresence>
			{contents.map(({ id, Render }) => (
				<Render key={id} close={() => hideContent(id)} />
			))}
		</AnimatePresence>
	);

	return (
		<OverlayContext value={{ contents, setContents }}>
			{providerChildren}
			{createPortal(children, overlayRoot)}
		</OverlayContext>
	);
}
