import { cn } from '@/lib/common';
import { createElement } from 'react';
import type { FlexProps } from './shared';
import { alignStyles } from './styles/align.css';
import { directionStyles } from './styles/direction.css';
import { flex, noGrow, noShrink } from './styles/flex.css';
import { justifyStyles } from './styles/justify.css';
import { wrapStyles } from './styles/wrap.css';

export function Flex(props: FlexProps) {
	const {
		as = 'div',
		direction = 'row',
		wrap = 'nowrap',
		align = 'stretch',
		justify = 'center',
		grow = true,
		shrink = true,
		gap,
		className: propClassName,
		style: propStyle,
		...restProps
	} = props;

	const classNames = [
		flex,
		directionStyles[direction],
		alignStyles[align],
		justifyStyles[justify],
		wrapStyles[wrap],
		{
			[noGrow]: !grow,
			[noShrink]: !shrink,
		},
	];

	return createElement(as, {
		...restProps,
		className: cn(classNames, propClassName),
		style: {
			...propStyle,
			gap,
		},
	});
}
