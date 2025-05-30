import { OverlayContext } from '@/components/ui/overlay/context';
import type { OverlayOptions, Renderer } from '@/components/ui/overlay/types';
import { nanoid } from 'nanoid';
import { useCallback, useContext, useEffect, useMemo } from 'react';

export function useOverlay<T extends object>(
	renderer: Renderer<T>,
	options: OverlayOptions = {},
) {
	const id = useMemo(nanoid, []);
	const { contents, setContents } = useContext(OverlayContext);
	const targetContent = useMemo(
		() => contents.find((c) => c.id === id),
		[id, contents],
	);

	const show = useCallback(
		(props: T) => {
			if (!targetContent) {
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
			} else {
				setContents((prev) =>
					prev.map((content) =>
						content.id === id
							? {
									...content,
									render: (prevProps) =>
										renderer({
											...prevProps,
											...props,
										}),
								}
							: content,
					),
				);
			}
		},
		[id, targetContent, renderer, options, setContents],
	);

	const hide = useCallback(() => {
		if (targetContent) {
			setContents((prev) => prev.filter((content) => content.id !== id));
		}
	}, [id, targetContent, setContents]);

	useEffect(() => {
		if (!targetContent) return;

		return () => {
			hide();
		};
	}, [targetContent, hide]);

	return {
		show,
		hide,
	};
}
