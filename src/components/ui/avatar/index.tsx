import { cn } from '@/lib/common';
import type { BaseProps } from '@/types/props';
import { avatar } from './styles.css';

interface AvatarProps extends BaseProps {
	size?: number;
	src?: string | null;
	onClick?: () => unknown;
}

export function Avatar(props: AvatarProps) {
	const { size = 32, src, onClick, className } = props;

	return (
		<img
			className={cn(avatar, className)}
			src={src || '/profile.png'}
			alt='Avatar'
			style={{
				width: size,
				height: size,
			}}
			onClick={onClick}
		/>
	);
}
