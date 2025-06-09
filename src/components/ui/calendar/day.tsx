import { DiaryInDateDrawer } from '@/components/features/diary/in-date-drawer';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { useOverlay } from '@/hooks/use-overlay';
import { cn } from '@/lib/common';
import { diaryManager } from '@/lib/managers/diary';
import { fullHeight } from '@/styles/utils.css';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useCallback, useContext, useMemo } from 'react';
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
	const { show: openDiaryInDate } = useOverlay(DiaryInDateDrawer);
	const diaries = useMemo(
		() => (day ? diaryManager.getDiariesByDate(day) : []),
		[day],
	);

	const onClickCell = useCallback(() => {
		if (day) {
			setSelectedDate(day);
			if (diaries.length > 0) {
				openDiaryInDate({ day, diaries });
			}
		}
	}, [day, diaries, setSelectedDate, openDiaryInDate]);

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
					{diaries[0] && <Typo.Body>{diaries[0].emoji}</Typo.Body>}
				</Column>
			)}
		</Container>
	);
}
