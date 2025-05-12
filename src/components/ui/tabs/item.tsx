import { Row } from '@/components/layout/row';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { cn } from '@/utils/common';
import { useContext } from 'react';
import { Typo } from '../typography';
import { TabsContext } from './context';
import { group, item, itemActive } from './styles/item.css';

export function TabsGroup(props: BaseProps<HAS_CHILDREN>) {
	const { children } = props;

	return (
		<Row className={group} justify='start'>
			{children}
		</Row>
	);
}

interface TabRailItemProps extends BaseProps<HAS_CHILDREN> {
	value: string;
}

export function TabsItem(props: TabRailItemProps) {
	const { value, children } = props;
	const { currentValue, setCurrentValue } = useContext(TabsContext);
	const isActive = currentValue === value;

	const handleClick = () => {
		setCurrentValue(value);
	};

	return (
		<Row className={cn(item, isActive && itemActive)} onClick={handleClick}>
			<Typo.Body weight={isActive ? 'strong' : 'medium'}>{children}</Typo.Body>
		</Row>
	);
}
