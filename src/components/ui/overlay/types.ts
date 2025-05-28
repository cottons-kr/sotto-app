import type { ReactNode } from 'react';

export interface OverlayProps {
	close: () => void;
}

export type Renderer = (props: OverlayProps) => ReactNode;

export type OverlayContent = {
	id: string;
	render: Renderer;
	options?: OverlayOptions;
};

export type OverlayOptions = {
	onClickBackdrop?: () => unknown;
};
