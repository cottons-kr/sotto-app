import { type Dispatch, type SetStateAction, createContext } from 'react';

type FlowContextType = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

export const FlowContext = createContext({} as FlowContextType);
