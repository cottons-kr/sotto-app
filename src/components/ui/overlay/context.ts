import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
} from 'react';

export type OverlayContent = {
	id: string;
	children: ReactNode;
};

type OverlayContextType = {
	dom?: HTMLDivElement | null;
	contents: Array<OverlayContent>;
	setContents: Dispatch<SetStateAction<Array<OverlayContent>>>;
};

export const OverlayContext = createContext({} as OverlayContextType);
