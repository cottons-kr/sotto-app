import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { Input } from '@/components/ui/input';
import { Typo } from '@/components/ui/typography';

interface ExplorerHeaderProps {
	title: string;
	count: number;
	search?: boolean;
	placeholder?: string;
	onSearch?: (query: string) => void;
}

export function ExplorerHeader(props: ExplorerHeaderProps) {
	const { title, count, search, placeholder, onSearch } = props;

	return (
		<>
			<Container vertical='small'>
				<Row align='center' justify='space-between'>
					<Typo.Title weight='strong'>{title}</Typo.Title>
					<Typo.Body>{count.toLocaleString()}</Typo.Body>
				</Row>
			</Container>
			{search && (
				<>
					<Container vertical='small'>
						<Input placeholder={placeholder} onValue={onSearch} />
					</Container>
					<PaddingDivider />
				</>
			)}
		</>
	);
}
