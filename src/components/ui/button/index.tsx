import { cn } from '@/lib/common';
import type { ButtonHTMLAttributes } from 'react';
import { LoadingCircle } from '../loading-circle';
import { Typo } from '../typography';
import { button, fillStyle, variantStyles } from './styles/button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	fill?: boolean;
	loading?: boolean;
}

type ButtonVariant = 'primary' | 'secondary' | 'text';

export function Button(props: ButtonProps) {
	const {
		variant = 'primary',
		fill = false,
		loading = false,
		disabled = loading,
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
		<button {...rest} className={cn(classNames)} disabled={disabled}>
			<Typo.Body weight={variant === 'text' ? 'medium' : 'strong'}>
				{loading ? <LoadingCircle size={20} /> : children}
			</Typo.Body>
		</button>
	);
}
