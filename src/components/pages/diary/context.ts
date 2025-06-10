import type { useDiary } from '@/hooks/use-diary';
import type { Diary } from '@/lib/managers/diary';
import { createContext } from 'react';

type DiaryContextType = {
	diary: Diary;
	diaryDispatch: ReturnType<typeof useDiary>[1];
};

export const DiaryContext = createContext({} as DiaryContextType);
