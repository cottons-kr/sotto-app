import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import type { JSX } from 'react';

interface ContainerProps extends BaseProps<HAS_CHILDREN> {
	as?: keyof JSX.IntrinsicElements;
	vertical?: Padding;
	horizontal?: Padding;
}

type Padding = 'none' | 'small' | 'regular' | 'medium' | 'large';

const paddingMap: Record<Padding, string> = {
	none: '0',
	small: '8px',
	regular: '12px',
	medium: '16px',
	large: '24px',
};

export function Container(props: ContainerProps) {
	const {
		as: Component = 'div',
		vertical = 'medium',
		horizontal = 'medium',
		...rest
	} = props;

	return (
		<Component
			{...rest}
			style={{
				padding: `${paddingMap[vertical]} ${paddingMap[horizontal]}`,
			}}
		/>
	);
}
