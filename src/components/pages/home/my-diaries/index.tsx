import { useQueryState } from 'nuqs';
import { HomeMyDiariesCalendar } from './views/calendar';
import { HomeMyDiariesList } from './views/list';

export function HomeMyDiariesSection() {
	const [currentView] = useQueryState('view', { defaultValue: 'list' });

	return currentView === 'list' ? (
		<HomeMyDiariesList />
	) : (
		<HomeMyDiariesCalendar />
	);
}

// 이번년도와 작년 년도에 작성한 일기만 보여주기
// 보여주는 총 월 수는 24개
