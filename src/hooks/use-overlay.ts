import { OverlayContext } from '@/components/ui/overlay/context';
import type { OverlayOptions, Renderer } from '@/components/ui/overlay/types';
import { nanoid } from 'nanoid';
import { useCallback, useContext, useEffect, useMemo } from 'react';

export function useOverlay<T extends object>(
	renderer: Renderer<T>,
	options: OverlayOptions = {},
) {
	const id = useMemo(nanoid, []);
	const { setContents } = useContext(OverlayContext);

	const show = useCallback(
		(props: T) => {
			setContents((prev) => [
				...prev,
				{
					id,
					render: (prevProps) =>
						renderer({
							...prevProps,
							...props,
						}),
					options,
				},
			]);
		},
		[id, renderer, options, setContents],
	);

	const hide = useCallback(() => {
		setContents((prev) => prev.filter((content) => content.id !== id));
	}, [id, setContents]);

	useEffect(() => {
		return () => {
			hide();
		};
	}, [hide]);

	return {
		show,
		hide,
	};
}
