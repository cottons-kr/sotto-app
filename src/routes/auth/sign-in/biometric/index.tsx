import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Content } from '@/components/ui/content';
import { processSignIn } from '@/lib/app';
import { log } from '@/lib/log';
import { authenticate } from '@tauri-apps/plugin-biometric';
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

			await processSignIn(pin);

			navigate('/home');
		} catch (error) {
			if (error && typeof error === 'object' && 'message' in error) {
				log('error', 'Biometric authentication failed', error.message);
			}
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
