import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Content } from '@/components/ui/content';
import { diaryManager } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { storageClient } from '@/lib/managers/storage';
import { confirm } from '@tauri-apps/plugin-dialog';
import { ShieldQuestion } from 'lucide-react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { page } from './page.css';

export default function SignInForgotPinPage() {
	const onClickDelete = useCallback(async () => {
		if (
			await confirm(
				'This action cannot be undone. you must create a new account, and all your diaries will be deleted.',
				{
					title: 'Delete all diaries and log out?',
					kind: 'warning',
				},
			)
		) {
			friendManager.clear();
			await diaryManager.clear();
			await storageClient.clear();
			location.reload();
		}
	}, []);

	return (
		<Column className={page}>
			<Content
				icon={<ShieldQuestion size={48} />}
				title='Forgot your PIN?'
				description='You have to delete all your diaries and log out'
			/>
			<ButtonGroup direction='vertical' bottomSafeAreaPadding>
				<Button fill variant='text' onClick={onClickDelete}>
					Delete all data and log out
				</Button>
				<Link to='/sign-in/pin'>
					<Button fill>Cancel</Button>
				</Link>
			</ButtonGroup>
		</Column>
	);
}
