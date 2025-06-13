import type { useDiary } from '@/hooks/use-diary';
import { type Dispatch, type SetStateAction, createContext } from 'react';

type DiaryContextType = {
	diary: Diary;
	diaryDispatch: ReturnType<typeof useDiary>[1];
	isAttachmentUpdated: boolean;
	setIsAttachmentUpdated: Dispatch<SetStateAction<boolean>>;
};

export const DiaryContext = createContext({} as DiaryContextType);
