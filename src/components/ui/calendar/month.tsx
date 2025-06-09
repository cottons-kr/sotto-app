import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { getCalendarDays } from '@/lib/date';
import { color } from '@/styles/color.css';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { PaddingDivider } from '../divider/padding';
import { Typo } from '../typography';
import { CalendarDayCell } from './day';
import { monthGrid } from './styles/month.css';

interface MonthCalendarProps {
	year: number;
	month: number;
}

export function MonthCalendar(props: MonthCalendarProps) {
	const { year, month } = props;

	const date = useMemo(
		() =>
			dayjs()
				.year(year)
				.month(month - 1),
		[year, month],
	);

	return (
		<>
			<Container vertical='small'>
				<Row align='center' justify='space-between'>
					<Typo.Lead weight='strong'>{date.format('MMMM')}</Typo.Lead>
					<Typo.Body color={color.sand}>{year}</Typo.Body>
				</Row>
			</Container>
			<Container vertical='small'>
				<div className={monthGrid}>
					{getCalendarDays(year, month).map((d, i) => (
						<CalendarDayCell key={i.toString()} day={d} />
					))}
				</div>
			</Container>
			<PaddingDivider />
		</>
	);
}
