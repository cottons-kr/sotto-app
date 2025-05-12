import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/field';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { content, page } from './page.css';

export default function AuthSignUpPage() {
	return (
		<Column className={page}>
			<TopNavigator leadingArea={<GoBack />} />
			<Column className={content}>
				<Container>
					<Typo.Title weight='strong'>Sign up</Typo.Title>
				</Container>
				<InputField label='Username'>
					<Input placeholder='Alphabet and number only' />
				</InputField>
				<InputField label='Password'>
					<Input type='password' placeholder='8-24 length' />
				</InputField>
				<InputField label='Confirm Password'>
					<Input type='password' placeholder='Enter same password' />
				</InputField>
			</Column>
			<ButtonGroup bottomSafeAreaPadding>
				<Button fill>Sign up</Button>
			</ButtonGroup>
		</Column>
	);
}
