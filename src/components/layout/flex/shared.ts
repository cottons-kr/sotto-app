import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import type { JSX } from 'react';

type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyContent =
	| 'start'
	| 'center'
	| 'end'
	| 'space-between'
	| 'space-around'
	| 'space-evenly';
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps
	extends BaseProps<HAS_CHILDREN>,
		React.HTMLAttributes<HTMLElement> {
	as?: keyof JSX.IntrinsicElements;
	direction?: FlexDirection;
	wrap?: FlexWrap;
	align?: AlignItems;
	justify?: JustifyContent;
	grow?: boolean;
	shrink?: boolean;
	gap?: string | number;
}
