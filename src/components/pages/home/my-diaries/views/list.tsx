import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { DiaryCard } from '@/components/ui/card/diary';
import { Content } from '@/components/ui/content';
import { diaryManager } from '@/lib/managers/diary';
import { fullHeight } from '@/styles/utils.css';
import { BookDashed } from 'lucide-react';
import { useMemo } from 'react';

export function HomeMyDiariesList() {
	const diaries = useMemo(() => diaryManager.getDiaries(), []);

	return (
		<Container className={fullHeight}>
			{diaries.length > 0 ? (
				<Grid>
					{diaries.map((diary) => (
						<DiaryCard key={diary.uuid} diary={diary} />
					))}
				</Grid>
			) : (
				<Content
					icon={<BookDashed size={48} />}
					description='Press “New Diary” to begin your story'
				/>
			)}
		</Container>
	);
}
