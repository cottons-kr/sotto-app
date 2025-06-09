import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/common';
import { fullHeight } from '@/styles/utils.css';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useCallback, useContext } from 'react';
import { Typo } from '../typography';
import { CalendarContext } from './context';
import { cell, date, selected, today } from './styles/day.css';

dayjs.extend(isToday);

interface CalendarDayCellProps {
	day: Dayjs | null;
}

export function CalendarDayCell(props: CalendarDayCellProps) {
	const { day } = props;

	const { selectedDate, setSelectedDate } = useContext(CalendarContext);

	const onClickCell = useCallback(() => {
		if (day) {
			setSelectedDate(day);
		}
	}, [day, setSelectedDate]);

	return (
		<Container
			className={cn(cell, day?.isSame(selectedDate, 'dates') && selected)}
			vertical='small'
			horizontal='small'
			onClick={onClickCell}
		>
			{day && (
				<Column className={fullHeight} align='center' justify='space-between'>
					<div className={cn(date, day.isToday() && today)}>
						<Typo.Body weight='medium'>{day.date()}</Typo.Body>
					</div>
				</Column>
			)}
		</Container>
	);
}
