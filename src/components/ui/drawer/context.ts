import { createContext } from 'react';

type DrawerContextType = {
	currentDrawer: string | null;
	openDrawer: (id: string) => void;
	closeDrawer: () => void;
};

export const DrawerContext = createContext({} as DrawerContextType);
