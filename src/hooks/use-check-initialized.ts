import { diaryManager } from '@/lib/managers/diary';
import { locationManager } from '@/lib/managers/location';
import { storageClient } from '@/lib/managers/storage';
import { useEffect } from 'react';

export function useCheckInitialized() {
	useEffect(() => {
		if (
			location.pathname !== '/' &&
			(!storageClient.isInitialized ||
				!diaryManager.isInitialized ||
				!locationManager.isInitialized)
		) {
			location.href = `/?redirect=${location.pathname}`;
		}
	}, []);
}
