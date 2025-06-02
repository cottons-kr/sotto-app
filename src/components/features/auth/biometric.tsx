import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Popup } from '@/components/ui/popup';
import { authenticate } from '@tauri-apps/plugin-biometric';
import { LockKeyhole } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import type { AuthPopupProps } from './shared';
import { icon, iconWrapper } from './styles/biometric.css';
import { popup } from './styles/popup.css';

export function AuthBiometricPopup(props: AuthPopupProps) {
	const { close, openAlternative, callback } = props;

	const processAuthentication = useCallback(async () => {
		try {
			await authenticate('Confirm your identity');
			await callback();
		} catch {
			openAlternative();
		} finally {
			close();
		}
	}, [callback, openAlternative, close]);

	useEffect(() => {
		processAuthentication();
	}, [processAuthentication]);

	return (
		<Popup className={popup}>
			<Column className={iconWrapper} align='center' shrink>
				<div className={icon}>
					<LockKeyhole size={48} />
				</div>
			</Column>
			<ButtonGroup smallPadding>
				<Button fill variant='secondary' onClick={openAlternative}>
					Use PIN instead
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
