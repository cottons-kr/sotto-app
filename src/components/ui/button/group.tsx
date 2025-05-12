import { Column } from '@/components/layout/column';
import { Row } from '@/components/layout/row';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { cn } from '@/utils/common';
import { buttonGroup, floatStyle } from './styles/group.css';

interface ButtonGroupProps extends BaseProps<HAS_CHILDREN> {
	direction?: 'horizontal' | 'vertical';
	float?: boolean;
}

export function ButtonGroup(props: ButtonGroupProps) {
	const { children, direction = 'horizontal', float = false } = props;

	const Wrapper = direction === 'horizontal' ? Row : Column;

	const classNames = [buttonGroup, { [floatStyle]: float }];

	return (
		<Wrapper
			className={cn(classNames)}
			gap={direction === 'horizontal' ? 8 : 4}
		>
			{children}
		</Wrapper>
	);
}
