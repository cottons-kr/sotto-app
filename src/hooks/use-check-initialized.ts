import { diaryManager } from '@/lib/managers/diary';
import { storageClient } from '@/lib/managers/storage';
import { useEffect } from 'react';

export function useCheckInitialized() {
	useEffect(() => {
		if (
			location.pathname !== '/' &&
			(!storageClient.isInitialized || !diaryManager.isInitialized)
		) {
			location.href = `/?redirect=${location.pathname}`;
		}
	}, []);
}
