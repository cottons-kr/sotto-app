import { Row } from '@/components/layout/row';
import { useEffect, useState } from 'react';
import { Typo } from '../typography';
import { input, item, itemActive, wrapper } from './styles/pin.css';
import { cn } from '@/lib/common';

interface PINInputProps {
	onPin?: (pin: string) => void;
}

export function PINInput(props: PINInputProps) {
	const { onPin } = props;
	const [pin, setPin] = useState('');

	useEffect(() => {
		if (pin.length >= 4) {
			onPin?.(pin.slice(0, 4));
		}
	}, [pin, onPin]);

	return (
		<Row className={wrapper} gap={8}>
			<input
				className={input}
				type='number'
				maxLength={4}
				pattern='[0-9]*'
				inputMode='numeric'
				min={0}
				max={9999}
				value={pin}
				onChange={(e) => setPin(e.target.value)}
				onClick={() => setPin('')}
			/>
			<PINItem value={pin[0]} />
			<PINItem value={pin[1]} />
			<PINItem value={pin[2]} />
			<PINItem value={pin[3]} />
		</Row>
	);
}

interface PINItemProps {
	value?: string;
}

function PINItem(props: PINItemProps) {
	const { value } = props;
	const isTyped = !!value;

	return (
		<div className={cn(item, isTyped && itemActive)}>
			<Typo.Title weight='medium'>{value ?? '0'}</Typo.Title>
		</div>
	);
}
