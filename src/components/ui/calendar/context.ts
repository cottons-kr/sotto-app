import type { Dayjs } from 'dayjs';
import { type Dispatch, type SetStateAction, createContext } from 'react';

type CalendarContextType = {
	selectedDate: Dayjs;
	setSelectedDate: Dispatch<SetStateAction<Dayjs>>;
};

export const CalendarContext = createContext({} as CalendarContextType);
