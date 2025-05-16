import { SignUpBiometricSection } from '@/components/pages/sign-up/biometric';
import { SignUpConfirmPinSection } from '@/components/pages/sign-up/confirm-pin';
import { SignUpFlowContext } from '@/components/pages/sign-up/context';
import { SignUpInformationSection } from '@/components/pages/sign-up/information';
import { SignUpSetPinSection } from '@/components/pages/sign-up/set-pin';
import { Flow } from '@/components/ui/flow';
import { useState } from 'react';

export default function SignUpPage() {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [name, setName] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [pin, setPin] = useState<string>('');
	const [confirmPin, setConfirmPin] = useState<string>('');
	const [useBiometricLogin, setUseBiometricLogin] = useState<boolean>(false);

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
					<SignUpBiometricSection key='biometric' />,
				]}
			/>
		</SignUpFlowContext>
	);
}
