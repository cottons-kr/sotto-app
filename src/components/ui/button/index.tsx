import { cn } from '@/lib/common';
import type { ButtonHTMLAttributes } from 'react';
import { Typo } from '../typography';
import { button, fillStyle, variantStyles } from './styles/button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	fill?: boolean;
}

type ButtonVariant = 'primary' | 'secondary' | 'text';

export function Button(props: ButtonProps) {
	const {
		variant = 'primary',
		fill = false,
		className,
		children,
		...rest
	} = props;

	const classNames = [
		button,
		variantStyles[variant],
		className,
		{ [fillStyle]: fill },
	];

	return (
		<button {...rest} className={cn(classNames)}>
			<Typo.Body weight={variant === 'text' ? 'medium' : 'strong'}>
				{children}
			</Typo.Body>
		</button>
	);
}
