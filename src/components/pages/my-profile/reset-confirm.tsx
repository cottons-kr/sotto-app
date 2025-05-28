import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import type { OverlayProps } from '@/components/ui/overlay/context';
import { Typo } from '@/components/ui/typography';
import { resetApp } from '@/lib/app';
import { authenticate, checkStatus } from '@tauri-apps/plugin-biometric';
import { ShieldQuestion } from 'lucide-react';
import { useCallback } from 'react';
import { centered, iconWrapper } from './styles/reset-confirm.css';

export function MyProfileResetConfirmDrawer(props: OverlayProps) {
	const { close } = props;

	const onClickReset = useCallback(async () => {
		const status = await checkStatus();

		try {
			if (status.isAvailable) {
				await authenticate('Confirm your identity');
			}
			await resetApp();
			location.reload();
		} finally {
			close();
		}
	}, [close]);

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
