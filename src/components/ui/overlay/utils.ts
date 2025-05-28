import type { OverlayContent } from './types';

export function isContentSaved(id: string, contents: Array<OverlayContent>) {
	return contents.some((content) => content.id === id);
}
