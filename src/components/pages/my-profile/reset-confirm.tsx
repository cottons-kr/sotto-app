import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { useAuth } from '@/hooks/use-auth';
import { resetApp } from '@/lib/app';
import { message } from '@tauri-apps/plugin-dialog';
import { ShieldQuestion } from 'lucide-react';
import { useCallback } from 'react';
import { centered, iconWrapper } from './styles/reset-confirm.css';

export function MyProfileResetConfirmDrawer(props: OverlayProps) {
	const { close } = props;
	const authenticate = useAuth();

	const onClickReset = useCallback(async () => {
		try {
			authenticate(async () => {
				await resetApp();
				location.reload();
			});
		} catch (error) {
			await message('Reset failed. Please try again later.');
			console.error('Reset failed:', error);
			close();
		}
	}, [authenticate, close]);

	return (
		<Drawer {...props}>
			<Container horizontal='none'>
				<Container className={centered} vertical='regular'>
					<div className={iconWrapper}>
						<ShieldQuestion />
					</div>
				</Container>
				<Container className={centered} vertical='small'>
					<Typo.Lead weight='strong'>Are you sure?</Typo.Lead>
				</Container>
				<Container className={centered} vertical='none'>
					<Typo.Body>Your data will be deleted and log out</Typo.Body>
				</Container>
			</Container>
			<ButtonGroup direction='horizontal'>
				<Button fill onClick={onClickReset}>
					Reset
				</Button>
				<Button fill variant='secondary' onClick={close}>
					Cancel
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
