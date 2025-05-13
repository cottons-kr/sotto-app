import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { SottoSymbol } from '@/components/ui/sotto-symbol';
import { Link } from 'react-router-dom';
import { centerSymbol } from './page.css';

export default function IndexPage() {
	return (
		<>
			<SottoSymbol className={centerSymbol} size={84} />
			<ButtonGroup direction='vertical' float>
				<Link to='/sign-up'>
					<Button fill>Sign up</Button>
				</Link>
			</ButtonGroup>
		</>
	);
}
