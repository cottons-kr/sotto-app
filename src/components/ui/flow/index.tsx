import { useState } from 'react';
import { FlowContext } from './context';

interface FlowProps {
	defaultStep?: number;
	pages: Array<React.ReactNode>;
}

export function Flow(props: FlowProps) {
	const { defaultStep = 0, pages } = props;
	const [currentStep, setCurrentStep] = useState(defaultStep);

	return (
		<FlowContext value={{ currentStep, setCurrentStep }}>
			{pages[currentStep]}
		</FlowContext>
	);
}
