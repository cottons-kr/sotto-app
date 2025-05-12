import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { SottoSymbol } from '@/components/ui/sotto-symbol';
import { Link } from 'react-router-dom';

export default function IndexPage() {
	return (
		<Column align='center' justify='center' style={{ height: '100vh' }}>
			<SottoSymbol size={84} />
			<ButtonGroup direction='vertical' float>
				<Link to='/auth/sign-in'>
					<Button variant='text' fill>
						Sign in
					</Button>
				</Link>
				<Link to='/auth/sign-up'>
					<Button fill>Sign up</Button>
				</Link>
			</ButtonGroup>
		</Column>
	);
}
