import { Container } from '@/components/layout/container';
import { Typo } from '@/components/ui/typography';
import { contentStyle } from './styles/content.css';

interface ExplorerContentProps {
	label: string;
	content: string;
}

export function ExplorerContent(props: ExplorerContentProps) {
	const { label, content } = props;

	return (
		<>
			<Container vertical='small'>
				<Typo.Body weight='medium'>{label}</Typo.Body>
			</Container>
			<Container vertical='small'>
				<Container className={contentStyle}>{content}</Container>
			</Container>
		</>
	);
}
