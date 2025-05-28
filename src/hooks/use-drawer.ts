import type { Renderer } from '@/components/ui/overlay/context';
import { useOverlay } from './use-overlay';

export function useDrawer(renderer: Renderer) {
	return useOverlay(renderer, {});
}
