import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { ExplorerHeader } from '@/components/pages/explorer/header';
import { ListItem } from '@/components/ui/list-item';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { diaryManager } from '@/lib/managers/diary';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExplorerDiariesPage() {
	const navigate = useNavigate();
	const diaries = diaryManager.getAllDiaries();

	return (
		<>
			<TopNavigator leadingArea={<GoBack label='Profile' />} />
			<ExplorerHeader
				title='Diaries'
				count={24}
				placeholder='Search by title or content'
			/>
			<Container>
				<Column gap={8}>
					{diaries.map((d) => (
						<ListItem
							key={d.uuid}
							leadingArea={
								<Row align='center' gap={8}>
									<Typo.Lead>{d.emoji}</Typo.Lead>
									<Typo.Body weight='strong'>{d.title || 'Untitled'}</Typo.Body>
								</Row>
							}
							trailingArea={<ChevronRight size={20} />}
							onClick={() => navigate(`/explorer/diaries/${d.uuid}`)}
						/>
					))}
				</Column>
			</Container>
		</>
	);
}
