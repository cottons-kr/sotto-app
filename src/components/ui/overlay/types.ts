import type { ComponentType } from 'react';

export interface OverlayProps {
	close: () => void;
}

export type Renderer<T = object> = (props: T & OverlayProps) => React.ReactNode;

export type OverlayContent = {
	id: string;
	render: Renderer;
	options?: OverlayOptions;
};

export type OverlayOptions = {
	onClickBackdrop?: () => unknown;
};

export type PropsOf<Component> = Component extends ComponentType<infer P>
	? P extends OverlayProps
		? P
		: never
	: never;
