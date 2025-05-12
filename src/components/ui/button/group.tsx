import { Column } from '@/components/layout/column';
import { Row } from '@/components/layout/row';
import { cn } from '@/lib/common';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import {
	bottomSafeAreaPaddingStyle,
	buttonGroup,
	floatStyle,
} from './styles/group.css';

interface ButtonGroupProps extends BaseProps<HAS_CHILDREN> {
	direction?: 'horizontal' | 'vertical';
	float?: boolean;
	bottomSafeAreaPadding?: boolean;
}

export function ButtonGroup(props: ButtonGroupProps) {
	const {
		children,
		direction = 'horizontal',
		float = false,
		bottomSafeAreaPadding,
	} = props;

	const Wrapper = direction === 'horizontal' ? Row : Column;

	const classNames = [
		buttonGroup,
		{
			[floatStyle]: float,
			[bottomSafeAreaPaddingStyle]: bottomSafeAreaPadding,
		},
	];

	return (
		<Wrapper
			className={cn(classNames)}
			gap={direction === 'horizontal' ? 8 : 4}
		>
			{children}
		</Wrapper>
	);
}
