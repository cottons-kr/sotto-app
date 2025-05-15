import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PINInput } from '@/components/ui/input/pin';
import { Typo } from '@/components/ui/typography';
import { storageClient } from '@/lib/managers/storage';
import { message } from '@tauri-apps/plugin-dialog';
import { Link, useNavigate } from 'react-router-dom';
import { getItem } from 'tauri-plugin-keychain';
import { page, title } from './page.css';

export default function SignInPinPage() {
	const navigate = useNavigate();

	const onPin = async (pin: string) => {
		try {
			const savedPin = await getItem('sotto-app');
			if (!savedPin) {
				throw new Error('PIN not found');
			}
			if (pin !== savedPin) {
				await message('Invalid PIN', { kind: 'error' });
				return;
			}

			await storageClient.init(pin);

			navigate('/home');
		} catch (error) {
			console.error('PIN authentication failed', error);
			await message('PIN authentication failed', { kind: 'error' });
		}
	};

	return (
		<Column className={page}>
			<Column className={page}>
				<Container className={title}>
					<Typo.Lead weight='strong'>Enter your PIN</Typo.Lead>
				</Container>
				<Container vertical='small'>
					<PINInput onPin={onPin} />
				</Container>
			</Column>
			<ButtonGroup direction='vertical' bottomSafeAreaPadding>
				<Button fill variant='text'>
					Forgot your PIN?
				</Button>
				{localStorage.getItem('useBiometricLogin') === 'true' && (
					<Link to='/sign-in/biometric'>
						<Button fill variant='secondary'>
							Use Biometric instead
						</Button>
					</Link>
				)}
			</ButtonGroup>
		</Column>
	);
}
