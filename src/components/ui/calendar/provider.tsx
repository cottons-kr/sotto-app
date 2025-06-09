import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarContext } from './context';

interface CalendarProviderProps extends BaseProps<HAS_CHILDREN> {}

export function CalendarProvider(props: CalendarProviderProps) {
	const { children } = props;

	const [selectedDate, setSelectedDate] = useState(dayjs());

	return (
		<CalendarContext value={{ selectedDate, setSelectedDate }}>
			{children}
		</CalendarContext>
	);
}
