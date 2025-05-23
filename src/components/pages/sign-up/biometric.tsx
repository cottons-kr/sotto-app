import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Content } from '@/components/ui/content';
import { ScanFace } from 'lucide-react';
import { fillHeight } from './styles/styles.css';

interface SignUpBiometricSectionProps {
	signUp: (biometricLogin: boolean) => void;
}

export function SignUpBiometricSection(props: SignUpBiometricSectionProps) {
	const { signUp } = props;

	return (
		<Column className={fillHeight}>
			<Content
				icon={<ScanFace size={48} />}
				title='Use Biometric Login?'
				description='You can use FaceID or TouchID to use this app'
			/>
			<ButtonGroup bottomSafeAreaPadding>
				<Button fill variant='secondary' onClick={() => signUp(false)}>
					No
				</Button>
				<Button fill onClick={() => signUp(true)}>
					Yes
				</Button>
			</ButtonGroup>
		</Column>
	);
}
