import type { Renderer } from '@/components/ui/overlay/types';
import { useOverlay } from './use-overlay';

export function useDrawer<T extends object>(renderer: Renderer<T>) {
	return useOverlay(renderer, {});
}
