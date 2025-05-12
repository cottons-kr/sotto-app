import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
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
			</Column>
			<ButtonGroup bottomSafeAreaPadding>
				<Button fill>Sign up</Button>
			</ButtonGroup>
		</Column>
	);
}
