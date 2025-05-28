import { OverlayContext } from '@/components/ui/overlay/context';
import type { OverlayOptions, Renderer } from '@/components/ui/overlay/types';
import { nanoid } from 'nanoid';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

export function useOverlay(renderer: Renderer, options: OverlayOptions = {}) {
	const id = useRef(nanoid());
	const { contents, setContents } = useContext(OverlayContext);
	const targetContent = useMemo(
		() => contents.find((c) => c.id === id.current),
		[contents],
	);

	const show = useCallback(() => {
		if (!targetContent) {
			setContents((prev) => [
				...prev,
				{
					id: id.current,
					render: renderer,
					options,
				},
			]);
		}
	}, [targetContent, renderer, options, setContents]);

	const hide = useCallback(() => {
		if (targetContent) {
			setContents((prev) =>
				prev.filter((content) => content.id !== id.current),
			);
		}
	}, [targetContent, setContents]);

	const toggle = useCallback(() => {
		if (targetContent) {
			hide();
		} else {
			show();
		}
	}, [targetContent, show, hide]);

	useEffect(() => {
		return hide;
	}, [hide]);

	return {
		show,
		hide,
		toggle,
	};
}
