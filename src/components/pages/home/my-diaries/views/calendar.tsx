import { MonthCalendar } from '@/components/ui/calendar/month';
import { CalendarProvider } from '@/components/ui/calendar/provider';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

export function HomeMyDiariesCalendar() {
	const recent13Months = useMemo(
		() =>
			Array.from({ length: 13 }).map((_, i) => {
				const date = dayjs().subtract(12 - i, 'month');
				return {
					year: date.year(),
					month: date.month() + 1,
				};
			}),
		[],
	);

	useEffect(() => {
		window.scrollTo({
			top: 99999,
			behavior: 'auto',
		});
	}, []);

	return (
		<CalendarProvider>
			{recent13Months.map(({ year, month }) => (
				<MonthCalendar key={`${year}-${month}`} year={year} month={month} />
			))}
		</CalendarProvider>
	);
}
