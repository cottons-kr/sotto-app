import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { PINInput } from '@/components/ui/input/pin';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useFlow } from '@/hooks/use-flow';
import { useCallback, useContext, useState } from 'react';
import { SignUpFlowContext } from './context';
import { pinUnmatched } from './styles/confirm-pin.css';
import { fillHeight, title } from './styles/styles.css';

export function SignUpConfirmPinSection() {
	const { next } = useFlow();
	const { pin: prevPin, setConfirmPin } = useContext(SignUpFlowContext);
	const [isUnmatched, setIsUnmatched] = useState(false);

	const onPin = useCallback(
		(pin: string) => {
			if (pin !== prevPin) {
				setIsUnmatched(true);
				return;
			}

			setConfirmPin(pin);
			next();
		},
		[setConfirmPin, next, prevPin],
	);

	return (
		<Column className={fillHeight}>
			<TopNavigator leadingArea={<GoBack />} />
			<Column className={fillHeight}>
				<Container className={title}>
					<Typo.Title weight='strong'>Confirm PIN</Typo.Title>
				</Container>
				<Container>
					<PINInput onPin={onPin} />
				</Container>
				{isUnmatched && (
					<Container className={pinUnmatched}>
						<Typo.Body>PIN does not match</Typo.Body>
					</Container>
				)}
			</Column>
		</Column>
	);
}
