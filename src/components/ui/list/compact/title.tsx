import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Typo } from '../../typography';

interface CompactListTitleProps {
	title: string;
	trailingArea?: React.ReactNode;
}

export function CompactListTitle(props: CompactListTitleProps) {
	const { title, trailingArea } = props;

	return (
		<Container vertical='small'>
			<Row align='center' justify='space-between'>
				<Typo.Body weight='strong'>{title}</Typo.Body>
				{trailingArea}
			</Row>
		</Container>
	);
}
