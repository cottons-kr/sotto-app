import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Content } from '@/components/ui/content';
import { ScanFace } from 'lucide-react';
import { fillHeight } from './styles/styles.css';

export function SignUpBiometricSection() {
	return (
		<Column className={fillHeight}>
			<Content
				icon={<ScanFace size={48} />}
				title='Use Biometric Login?'
				description='You can use FaceID or TouchID to use this app'
			/>
			<ButtonGroup bottomSafeAreaPadding>
				<Button fill variant='secondary'>
					No
				</Button>
				<Button fill>Yes and sign up</Button>
			</ButtonGroup>
		</Column>
	);
}
