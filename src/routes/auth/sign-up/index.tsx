import { generateKeyPair } from '@/binding/function/generate-key-pair';
import { SignUpBiometricSection } from '@/components/pages/sign-up/biometric';
import { SignUpConfirmPinSection } from '@/components/pages/sign-up/confirm-pin';
import { SignUpFlowContext } from '@/components/pages/sign-up/context';
import { SignUpInformationSection } from '@/components/pages/sign-up/information';
import { SignUpSetPinSection } from '@/components/pages/sign-up/set-pin';
import { Flow } from '@/components/ui/flow';
import { processSignIn } from '@/lib/app';
import { log } from '@/lib/log';
import { apiClient } from '@/lib/managers/http';
import { storageClient } from '@/lib/managers/storage';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveItem } from 'tauri-plugin-keychain';

export default function SignUpPage() {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [name, setName] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [pin, setPin] = useState<string>('');
	const [confirmPin, setConfirmPin] = useState<string>('');
	const [useBiometricLogin, setUseBiometricLogin] = useState<boolean>(false);
	const navigate = useNavigate();

	const onClickSignUp = useCallback(
		async (biometricLogin: boolean) => {
			setUseBiometricLogin(biometricLogin);

			const { publicKeyPem, privateKeyPem } = await generateKeyPair();
			try {
				await storageClient.init(pin);
				await saveItem('sotto-app', pin);

				const { accessToken, user } = await apiClient.post<SignUpResponse>(
					'/users',
					{
						name,
						username,
						profileUrl: profileImage,
						publicKey: publicKeyPem,
					},
				);

				storageClient.set('publicKey', publicKeyPem);
				storageClient.set('privateKey', privateKeyPem);
				if (profileImage) {
					localStorage.setItem('profileImage', profileImage);
				}

				localStorage.setItem('app-initialized', 'true');
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('username', username);
				localStorage.setItem('name', name);
				localStorage.setItem('useBiometricLogin', biometricLogin.toString());

				await message(`Sign up successful! Welcome ${user.name}`);
				await processSignIn(pin);

				navigate('/home');
			} catch (error) {
				await message(`Sign up failed. ${error}`, { kind: 'error' });
				log('error', 'Sign up failed', error);
			}
		},
		[name, username, profileImage, pin, navigate],
	);

	return (
		<SignUpFlowContext
			value={{
				profileImage,
				name,
				username,
				pin,
				confirmPin,
				useBiometricLogin,
				setProfileImage,
				setName,
				setUsername,
				setPin,
				setConfirmPin,
				setUseBiometricLogin,
			}}
		>
			<Flow
				pages={[
					<SignUpInformationSection key='information' />,
					<SignUpSetPinSection key='set-pin' />,
					<SignUpConfirmPinSection key='confirm-pin' />,
					<SignUpBiometricSection key='biometric' signUp={onClickSignUp} />,
				]}
			/>
		</SignUpFlowContext>
	);
}
