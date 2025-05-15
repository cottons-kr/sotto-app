import { generateKeyPair } from '@/binding/function/generate-key-pair';
import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Content } from '@/components/ui/content';
import { apiClient } from '@/lib/http';
import { storageClient } from '@/lib/storage';
import { message } from '@tauri-apps/plugin-dialog';
import { ScanFace } from 'lucide-react';
import { useContext } from 'react';
import { saveItem } from 'tauri-plugin-keychain';
import { SignUpFlowContext } from './context';
import { fillHeight } from './styles/styles.css';

export function SignUpBiometricSection() {
	const { name, username, profileImage, pin, setUseBiometricLogin } =
		useContext(SignUpFlowContext);

	const onClick = async (useBiometricLogin: boolean) => {
		setUseBiometricLogin(useBiometricLogin);

		const { publicKeyPem, privateKeyPem } = await generateKeyPair();
		try {
			const { accessToken, user } = await apiClient.post<SignUpResponse>(
				'/users',
				{
					name,
					username,
					profileUrl: profileImage,
					publicKey: publicKeyPem,
				},
			);

			await storageClient.init(pin);

			await saveItem('sotto-app', pin);

			storageClient.set('accessToken', accessToken);
			storageClient.set('username', username);
			storageClient.set('publicKey', publicKeyPem);
			storageClient.set('privateKey', privateKeyPem);
			if (profileImage) {
				storageClient.set('profileImage', profileImage);
			}

			localStorage.setItem('app-initialized', 'true');
			localStorage.setItem('useBiometricLogin', useBiometricLogin.toString());

			await message(`Sign up successful! Welcome ${user}`);
		} catch (error) {
			await message('Sign up failed. Please try again.', { kind: 'error' });
			console.error('Sign up failed', error);
		}
	};

	return (
		<Column className={fillHeight}>
			<Content
				icon={<ScanFace size={48} />}
				title='Use Biometric Login?'
				description='You can use FaceID or TouchID to use this app'
			/>
			<ButtonGroup bottomSafeAreaPadding>
				<Button fill variant='secondary' onClick={() => onClick(false)}>
					No
				</Button>
				<Button fill onClick={() => onClick(true)}>
					Yes
				</Button>
			</ButtonGroup>
		</Column>
	);
}
