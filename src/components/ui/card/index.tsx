import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import type { Diary } from '@/lib/managers/diary';
import { Typo } from '../typography';
import { card, content, date, preview } from './styles.css';

interface CardProps {
	diary: Diary;
}

export function Card(props: CardProps) {
	const { diary } = props;

	return (
		<Container className={card}>
			<Typo.Caption className={date}>1 day ago</Typo.Caption>
			<Column className={content} justify='end'>
				<Typo.Title>{diary.emoji}</Typo.Title>
				<Typo.Body weight='strong'>{diary.title}</Typo.Body>
				<Typo.Caption className={preview}>
					{diary.content.split('\n')[0].trim()}
				</Typo.Caption>
			</Column>
		</Container>
	);
}
