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
