import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { useContext } from 'react';
import { TabsContext } from './context';

interface TabsContentProps extends BaseProps<HAS_CHILDREN> {
	value: string;
}

export function TabsContent(props: TabsContentProps) {
	const { value, children } = props;
	const { currentValue } = useContext(TabsContext);

	return currentValue === value ? children : null;
}
