import { cn } from '@/lib/common';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { type JSX, createElement } from 'react';
import { typography, typographyFill } from './styles/typography.css';
import { weightStyles } from './styles/weight.css';

type TypographyWeight = 'regular' | 'medium' | 'strong';

export interface TypographyBaseProps extends BaseProps<HAS_CHILDREN> {
	as?: keyof JSX.IntrinsicElements;
	weight?: TypographyWeight;
	color?: string;
	fill?: boolean;
}

export function TypographyBase(props: TypographyBaseProps) {
	const {
		as = 'span',
		weight = 'regular',
		color,
		fill,
		className: propClassName,
		style: propStyle,
		...restProps
	} = props;

	if (!restProps.children) {
		return null;
	}

	const classNames = [
		typography,
		weightStyles[weight],
		propClassName,
		{
			[typographyFill]: fill,
		},
	];

	return createElement(as, {
		...restProps,
		className: cn(classNames),
		style: { color, ...propStyle },
	});
}
