import { FlowContext } from '@/components/ui/flow/context';
import { useCallback, useContext } from 'react';

export function useFlow() {
	const context = useContext(FlowContext);
	if (!context) {
		throw new Error('useFlow must be used inside a Flow component');
	}

	const { currentStep, setCurrentStep } = context;

	const next = useCallback(() => {
		setCurrentStep((prev) => prev + 1);
	}, [setCurrentStep]);

	const prev = useCallback(() => {
		setCurrentStep((prev) => prev - 1);
	}, [setCurrentStep]);

	const setStep = setCurrentStep;

	return {
		currentStep,
		next,
		prev,
		setStep,
	};
}
