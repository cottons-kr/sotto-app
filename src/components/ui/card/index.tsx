import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Typo } from '../typography';
import { card, content, date, preview } from './styles.css';

export function Card() {
	return (
		<Container className={card}>
			<Typo.Caption className={date}>1 day ago</Typo.Caption>
			<Column className={content} justify='end'>
				<Typo.Title>😀</Typo.Title>
				<Typo.Body weight='strong'>Diary Title</Typo.Body>
				<Typo.Caption className={preview}>Lorem ipsum</Typo.Caption>
			</Column>
		</Container>
	);
}
