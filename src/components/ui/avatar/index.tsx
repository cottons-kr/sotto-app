import type { BaseProps } from '@/types/props';
import { cn } from '@/utils/common';
import { avatar } from './styles.css';

interface AvatarProps extends BaseProps {
	size?: number;
	src?: string;
}

export function Avatar(props: AvatarProps) {
	const { size = 32, className } = props;

	return (
		<img
			className={cn(avatar, className)}
			src='/profile.png'
			alt='Avatar'
			style={{
				width: size,
				height: size,
			}}
		/>
	);
}
