import { AuthBiometricPopup } from '@/components/features/auth/biometric';
import { AuthPINPopup } from '@/components/features/auth/pin';
import { checkStatus } from '@tauri-apps/plugin-biometric';
import { useMemo } from 'react';
import { useOverlay } from './use-overlay';

export function useAuth() {
	const { show: showPIN, hide: hidePIN } = useOverlay(AuthPINPopup);
	const { show: showBiometric, hide: hideBiometric } =
		useOverlay(AuthBiometricPopup);
	const isBiometricAvailable = useMemo(
		async () => (await checkStatus()).isAvailable,
		[],
	);

	const openBiometric = (callback: () => unknown) => {
		showBiometric({
			close: hideBiometric,
			openAlternative: () => {
				openPIN(callback);
				hideBiometric();
			},
			callback,
		});
	};

	const openPIN = (callback: () => unknown) => {
		showPIN({
			close: hidePIN,
			openAlternative: () => {
				openBiometric(callback);
				hidePIN();
			},
			callback,
		});
	};

	const authenticate = async (callback: () => unknown) => {
		if (
			(await isBiometricAvailable) &&
			localStorage.getItem('useBiometricLogin') === 'true'
		) {
			openBiometric(callback);
		} else {
			openPIN(callback);
		}
	};

	return authenticate;
}
