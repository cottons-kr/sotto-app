import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PINInput } from '@/components/ui/input/pin';
import { Popup } from '@/components/ui/popup';
import { Typo } from '@/components/ui/typography';
import { log } from '@/lib/log';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback } from 'react';
import { getItem } from 'tauri-plugin-keychain';
import type { AuthPopupProps } from './shared';
import { pinInput } from './styles/pin.css';
import { popup } from './styles/popup.css';

export function AuthPINPopup(props: AuthPopupProps) {
	const { close, openAlternative, callback } = props;

	const onPin = useCallback(
		async (pin: string) => {
			try {
				const savedPin = await getItem('sotto-app');
				if (!savedPin) {
					throw new Error('PIN not found');
				}
				if (pin !== savedPin) {
					await message('Invalid PIN', { kind: 'error' });
					return;
				}
				try {
					await callback();
				} finally {
					close();
				}
			} catch (error) {
				log('error', 'PIN authentication failed', error);
			}
		},
		[callback, close],
	);

	return (
		<Popup className={popup}>
			<Container vertical='regular'>
				<Column align='center'>
					<Typo.Lead weight='strong'>Enter your PIN</Typo.Lead>
				</Column>
			</Container>
			<Container>
				<Column className={pinInput} align='center'>
					<PINInput onPin={onPin} />
				</Column>
			</Container>
			<ButtonGroup smallPadding>
				<Button fill variant='secondary' onClick={openAlternative}>
					Use biometric instead
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
