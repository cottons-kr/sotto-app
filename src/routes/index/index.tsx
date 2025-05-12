import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { SottoSymbol } from '@/components/ui/sotto-symbol';

export default function IndexPage() {
	return (
		<Column align='center' justify='center' style={{ height: '100vh' }}>
			<SottoSymbol size={84} />
			<ButtonGroup direction='vertical' float>
				<Button variant='text' fill>
					Sign in
				</Button>
				<Button fill>Sign up</Button>
			</ButtonGroup>
		</Column>
	);
}
