import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { color } from '@/styles/color.css';
import { Typo } from '../typography';
import { iconWrapper } from './styles.css';

interface PopupContentProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export function PopupContent(props: PopupContentProps) {
	const { icon, title, description } = props;

	return (
		<Container horizontal='small'>
			<Column align='center'>
				<Container horizontal='none' vertical='small'>
					<div className={iconWrapper}>{icon}</div>
				</Container>
				<Container horizontal='none' vertical='small'>
					<Typo.Lead weight='strong'>{title}</Typo.Lead>
				</Container>
				<Typo.Body weight='medium' color={color.sand}>
					{description}
				</Typo.Body>
			</Column>
		</Container>
	);
}
