import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import type { Diary } from '@/lib/managers/diary';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typo } from '../typography';
import { card, content, date, preview } from './styles.css';

interface DiaryCardProps {
	diary: Diary;
}

export function DiaryCard(props: DiaryCardProps) {
	const { diary } = props;
	const navigate = useNavigate();
	const now = new Date();
	const createdAt = new Date(diary.createdAt);
	const diff = Math.abs(now.getTime() - createdAt.getTime());
	const diffDays = Math.floor(diff / (1000 * 3600 * 24));

	const onClick = useCallback(() => {
		navigate(`/diary?uuid=${diary.uuid}&readonly=${diary.readonly ?? false}`);
	}, [diary, navigate]);

	return (
		<Container className={card} onClick={onClick}>
			<Typo.Caption className={date}>
				{diffDays === 0
					? 'Today'
					: diffDays === 1
						? 'Yesterday'
						: `${diffDays} days ago`}
			</Typo.Caption>
			<Column className={content} justify='end'>
				<Typo.Title>{diary.emoji}</Typo.Title>
				<Typo.Body weight='strong'>{diary.title || 'Untitled'}</Typo.Body>
				<Typo.Caption className={preview}>
					{diary.content.split('\n')[0].trim() || 'No content yet :('}
				</Typo.Caption>
			</Column>
		</Container>
	);
}
