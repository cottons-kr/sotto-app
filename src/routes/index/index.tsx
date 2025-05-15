import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { SottoSymbol } from '@/components/ui/sotto-symbol';
import { wait } from '@/lib/common';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { centerSymbol, loaderCircle } from './page.css';

export default function IndexPage() {
	const [showSignUp, setShowSignUp] = useState(false);
	const navigate = useNavigate();

	const startApp = useCallback(async () => {
		await wait(500);

		if (localStorage.getItem('app-initialized') === 'true') {
			setShowSignUp(false);
		} else {
			setShowSignUp(true);
			return;
		}

		if (localStorage.getItem('useBiometricLogin') === 'true') {
			navigate('/sign-in/biometric');
		} else {
			navigate('/sign-in/pin');
		}
	}, [navigate]);

	useEffect(() => {
		startApp();
	}, [startApp]);

	return (
		<>
			<SottoSymbol className={centerSymbol} size={84} />
			<ButtonGroup direction='vertical' float>
				{showSignUp ? (
					<Link to='/sign-up'>
						<Button fill>Sign up</Button>
					</Link>
				) : (
					<LoaderCircle className={loaderCircle} size={32} />
				)}
			</ButtonGroup>
		</>
	);
}
