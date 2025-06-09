import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { type JSX, useRef } from 'react';

interface ContainerProps extends BaseProps<HAS_CHILDREN> {
	as?: keyof JSX.IntrinsicElements;
	vertical?: Padding;
	horizontal?: Padding;
	onClick?: () => unknown;
	onLongPress?: () => unknown;
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
		onClick,
		onLongPress,
		...rest
	} = props;

	const timeoutRef = useRef<number | null>(null);
	const longPressedRef = useRef(false);

	const handlePressStart = () => {
		longPressedRef.current = false;
		timeoutRef.current = window.setTimeout(() => {
			longPressedRef.current = true;
			onLongPress?.();
		}, 350);
	};

	const handlePressEnd = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
		}
		if (!longPressedRef.current) {
			onClick?.();
		}
		longPressedRef.current = false;
	};

	return (
		<Component
			{...rest}
			{...(onLongPress
				? {
						onMouseDown: handlePressStart,
						onTouchStart: handlePressStart,
						onMouseUp: handlePressEnd,
						onMouseLeave: handlePressEnd,
						onTouchEnd: handlePressEnd,
						onTouchCancel: handlePressEnd,
					}
				: { onClick })}
			style={{
				padding: `${paddingMap[vertical]} ${paddingMap[horizontal]}`,
			}}
		/>
	);
}
