import dayjs from 'dayjs';

export function getCalendarDays(year: number, month: number) {
	const startOfMonth = dayjs(`${year}-${month}-01`);
	const startDay = startOfMonth.day();
	const daysInMonth = startOfMonth.daysInMonth();

	const calendar = [];
	for (let i = 0; i < startDay; i++) {
		calendar.push(null);
	}

	for (let d = 1; d <= daysInMonth; d++) {
		calendar.push(dayjs(`${year}-${month}-${d}`));
	}

	return calendar;
}
