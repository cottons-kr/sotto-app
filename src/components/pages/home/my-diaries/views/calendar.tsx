import { MonthCalendar } from '@/components/ui/calendar/month';
import { CalendarProvider } from '@/components/ui/calendar/provider';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import { useEffect, useMemo } from 'react';

dayjs.extend(toObject);

export function HomeMyDiariesCalendar() {
	const { years, months } = useMemo(() => dayjs().toObject(), []);

	useEffect(() => {
		window.scrollTo({
			top: 99999,
			behavior: 'auto',
		});
	}, []);

	return (
		<CalendarProvider>
			{Array.from({ length: 12 }).map((_, i) => (
				<MonthCalendar key={i.toString()} year={years - 1} month={i + 1} />
			))}
			{Array.from({ length: months + 1 }).map((_, i) => (
				<MonthCalendar key={i.toString()} year={years} month={i + 1} />
			))}
		</CalendarProvider>
	);
}
