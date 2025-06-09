import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Typo } from '@/components/ui/typography';
import { ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ExplorerItemProps {
	icon: React.ReactNode;
	name: string;
	path: string;
}

export function MyProfileExplorerItem(props: ExplorerItemProps) {
	const { icon, name, path } = props;

	const navigate = useNavigate();

	const onClick = useCallback(() => {
		navigate(path);
	}, [path, navigate]);

	return (
		<Container onClick={onClick}>
			<Row gap={8} align='center' justify='space-between'>
				<Row gap={8} align='center'>
					{icon}
					<Typo.Body weight='medium'>{name}</Typo.Body>
				</Row>
				<ChevronRight size={20} />
			</Row>
		</Container>
	);
}
