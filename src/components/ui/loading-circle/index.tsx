import { LoaderCircle } from 'lucide-react';
import { loaderCircle, wrapper } from './styles.css';

interface LoadingCircleProps {
	size?: number;
}

export function LoadingCircle(props: LoadingCircleProps) {
	const { size = 24 } = props;

	return (
		<div style={{ width: size, height: size }} className={wrapper}>
			<LoaderCircle className={loaderCircle} size={size} />
		</div>
	);
}
