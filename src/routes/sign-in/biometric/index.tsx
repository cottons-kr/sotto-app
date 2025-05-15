import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Content } from '@/components/ui/content';
import { wait } from '@/lib/common';
import { storageClient } from '@/lib/managers/storage';
import { authenticate } from '@tauri-apps/plugin-biometric';
import { message } from '@tauri-apps/plugin-dialog';
import { LockKeyhole } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getItem } from 'tauri-plugin-keychain';
import { page } from './page.css';

export default function SignInBiometricPage() {
	const navigate = useNavigate();

	const authenticateBiometric = useCallback(async () => {
		try {
			await authenticate('Authenticate to continue');
			const pin = await getItem('sotto-app');
			if (!pin) {
				throw new Error('PIN not found');
			}

			await storageClient.init(pin);
			await wait(500);

			navigate('/home');
		} catch (error) {
			console.error('Biometric authentication failed', error);
			await message('Biometric authentication failed', { kind: 'error' });
		}
	}, [navigate]);

	useEffect(() => {
		authenticateBiometric();
	}, [authenticateBiometric]);

	return (
		<>
			<Column className={page}>
				<Content
					icon={<LockKeyhole size={48} onClick={authenticateBiometric} />}
				/>
				<ButtonGroup bottomSafeAreaPadding>
					<Link to='/sign-in/pin'>
						<Button fill variant='secondary'>
							Use PIN instead
						</Button>
					</Link>
				</ButtonGroup>
			</Column>
		</>
	);
}
