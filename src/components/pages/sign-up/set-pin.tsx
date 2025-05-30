import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { PINInput } from '@/components/ui/input/pin';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useFlow } from '@/hooks/use-flow';
import { useCallback, useContext } from 'react';
import { SignUpFlowContext } from './context';
import { fillHeight, title } from './styles/styles.css';

export function SignUpSetPinSection() {
	const { next } = useFlow();
	const { setPin } = useContext(SignUpFlowContext);

	const onPin = useCallback(
		(pin: string) => {
			setPin(pin);
			next();
		},
		[setPin, next],
	);

	return (
		<Column className={fillHeight}>
			<TopNavigator leadingArea={<GoBack />} />
			<Column className={fillHeight}>
				<Container className={title}>
					<Typo.Title weight='strong'>Set PIN</Typo.Title>
				</Container>
				<Container>
					<PINInput onPin={onPin} />
				</Container>
			</Column>
		</Column>
	);
}
