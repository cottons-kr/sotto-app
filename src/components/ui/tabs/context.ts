import { createContext } from 'react';

type TabsContextType = {
	currentValue: string | null;
	setCurrentValue: (value: string) => unknown;
};

export const TabsContext = createContext({} as TabsContextType);
