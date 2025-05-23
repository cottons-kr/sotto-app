import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { DiaryCard } from '@/components/ui/card/diary';
import { Content } from '@/components/ui/content';
import { diaryManager } from '@/lib/managers/diary';
import { fullHeight } from '@/styles/utils.css';
import { BookDashed } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomeMyDiariesSection() {
	const diaries = diaryManager.getDiaries();

	return (
		<>
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
			<ButtonGroup direction='vertical' float>
				<Link to='/diary'>
					<Button fill>New Diary</Button>
				</Link>
			</ButtonGroup>
		</>
	);
}
