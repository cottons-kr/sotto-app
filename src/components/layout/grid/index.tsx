import { cn } from '@/lib/common';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { grid } from './styles.css';

interface GridProps extends BaseProps<HAS_CHILDREN> {}

export function Grid(props: GridProps) {
	const { className, ...rest } = props;

	const classNames = [grid, className];

	return <div {...rest} className={cn(classNames)} />;
}
