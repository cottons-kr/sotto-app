import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import type { Diary } from '@/lib/managers/diary';
import { Link } from 'react-router-dom';
import { Typo } from '../typography';
import { card, content, date, preview } from './styles.css';

interface DiaryCardProps {
	diary: Diary;
}

export function DiaryCard(props: DiaryCardProps) {
	const { diary } = props;

	return (
		<Link to={`/diary?uuid=${diary.uuid}`}>
			<Container className={card}>
				<Typo.Caption className={date}>1 day ago</Typo.Caption>
				<Column className={content} justify='end'>
					<Typo.Title>{diary.emoji}</Typo.Title>
					<Typo.Body weight='strong'>{diary.title || 'Untitled'}</Typo.Body>
					<Typo.Caption className={preview}>
						{diary.content.split('\n')[0].trim() || 'No content yet :('}
					</Typo.Caption>
				</Column>
			</Container>
		</Link>
	);
}
