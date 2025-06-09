import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { color } from '@/styles/color.css';
import { Typo } from '../../typography';

interface CompactListItemProps {
	name: string;
	description?: string;
	trailingArea?: React.ReactNode;
	onClick?: () => unknown;
}

export function CompactListItem(props: CompactListItemProps) {
	const { name, description, trailingArea, onClick } = props;

	return (
		<Container vertical='small' onClick={onClick}>
			<Row gap={8} align='center' justify='space-between'>
				<Column gap={2} align='start'>
					<Typo.Body weight='medium'>{name}</Typo.Body>
					{description && (
						<Typo.Caption color={color.sand}>{description}</Typo.Caption>
					)}
				</Column>
				{trailingArea}
			</Row>
		</Container>
	);
}
