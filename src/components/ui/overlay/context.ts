import { type Dispatch, type SetStateAction, createContext } from 'react';
import type { OverlayContent } from './types';

type OverlayContextType = {
	contents: Array<OverlayContent>;
	setContents: Dispatch<SetStateAction<Array<OverlayContent>>>;
};

export const OverlayContext = createContext({} as OverlayContextType);
