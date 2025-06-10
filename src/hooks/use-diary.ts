import { diaryManager } from '@/lib/managers/diary';
import { storageClient } from '@/lib/managers/storage';
import type { Weather } from '@/lib/weather';
import { useCallback, useState } from 'react';

export function useDiary(uuid: string | null) {
	const [diary, setDiary] = useState(() => getDiaryOrCreate(uuid));

	const setEmoji = useCallback((emoji: string) => {
		setDiary((prev) => ({
			...prev,
			emoji,
		}));
	}, []);

	const setTitle = useCallback((title: string) => {
		setDiary((prev) => ({
			...prev,
			title,
		}));
	}, []);

	const setContent = useCallback((content: string) => {
		setDiary((prev) => ({
			...prev,
			content,
		}));
	}, []);

	const setLocation = useCallback((location: string) => {
		setDiary((prev) => ({
			...prev,
			location,
		}));
	}, []);

	const setWeather = useCallback((weather: Weather) => {
		setDiary((prev) => ({
			...prev,
			weather,
		}));
	}, []);

	return [
		diary,
		{ setEmoji, setTitle, setContent, setLocation, setWeather, setDiary },
	] as const;
}

function getDiaryOrCreate(uuid?: string | null) {
	if (!storageClient.isInitialized) {
		return diaryManager.createDiary();
	}

	if (uuid) {
		const data = diaryManager.getDiary(uuid);
		if (!data) {
			throw new Error('Diary not found');
		}
		return data;
	}
	return diaryManager.createDiary();
}
