import { SignUpInformationSection } from '@/components/sections/sign-up/information';
import { Flow } from '@/components/ui/flow';

export function SignUpPage() {
	return <Flow pages={[<SignUpInformationSection key='information' />]} />;
}
