import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Divider } from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';

interface ExplorerHeaderProps {
	title: string;
	count: number;
	placeholder: string;
	onSearch?: (query: string) => void;
}

export function ExplorerHeader(props: ExplorerHeaderProps) {
	const { title, count, placeholder, onSearch } = props;

	return (
		<>
			<Container vertical='small'>
				<Row align='center' justify='space-between'>
					<Typo.Title weight='strong'>{title}</Typo.Title>
					<Typo.Body>{count.toLocaleString()}</Typo.Body>
				</Row>
			</Container>
			<Container vertical='small'>
				<Input placeholder={placeholder} onValue={onSearch} />
			</Container>
			<Container horizontal='none'>
				<Divider />
			</Container>
		</>
	);
}
