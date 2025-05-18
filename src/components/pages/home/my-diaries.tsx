import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { DiaryCard } from '@/components/ui/card/diary';
import { diaryManager } from '@/lib/managers/diary';
import { Link } from 'react-router-dom';

export function HomeMyDiariesSection() {
	return (
		<>
			<Container>
				<Grid>
					{diaryManager.getDiaries().map((diary) => (
						<DiaryCard key={diary.uuid} diary={diary} />
					))}
				</Grid>
			</Container>
			<ButtonGroup direction='vertical' float>
				<Link to='/diary'>
					<Button fill>New Diary</Button>
				</Link>
			</ButtonGroup>
		</>
	);
}
