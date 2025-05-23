import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Typo } from '../typography';
import { content, iconStyle } from './styles.css';

interface ContentProps {
	icon?: React.ReactNode;
	title?: string;
	description?: string;
}

export function Content(props: ContentProps) {
	const { icon, title, description } = props;

	return (
		<Column className={content} align='center'>
			{icon && (
				<Container vertical='small' horizontal='none'>
					<div className={iconStyle}>{icon}</div>
				</Container>
			)}
			{title && (
				<Container vertical='small' horizontal='none'>
					<Typo.Title weight='strong'>{title}</Typo.Title>
				</Container>
			)}
			{description && (
				<Container vertical='small' horizontal='none'>
					<Typo.Body>{description}</Typo.Body>
				</Container>
			)}
		</Column>
	);
}
