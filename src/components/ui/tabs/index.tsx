import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { useQueryState } from 'nuqs';
import { TabsContext } from './context';

interface TabsProps extends BaseProps<HAS_CHILDREN> {
	defaultValue?: string;
}

export function Tabs(props: TabsProps) {
	const { defaultValue, children } = props;
	const [currentValue, setCurrentValue] = useQueryState('tab');

	return (
		<TabsContext
			value={{
				currentValue: currentValue || defaultValue || null,
				setCurrentValue,
			}}
		>
			{children}
		</TabsContext>
	);
}
