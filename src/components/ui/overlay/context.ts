import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
} from 'react';

export interface OverlayProps {
	close: () => void;
}

export type Renderer = (props: OverlayProps) => ReactNode;

export type OverlayContent = {
	id: string;
	Render: Renderer;
};

type OverlayContextType = {
	contents: Array<OverlayContent>;
	setContents: Dispatch<SetStateAction<Array<OverlayContent>>>;
};

export const OverlayContext = createContext({} as OverlayContextType);
