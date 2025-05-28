import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { ExplorerContent } from '@/components/pages/explorer/content';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { diaryManager } from '@/lib/managers/diary';
import { color } from '@/styles/color.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExplorerDiariesDetailPage() {
	const { uuid } = useParams();
	const navigate = useNavigate();

	const diary = diaryManager.getDiary(uuid || '');
	if (!diary) {
		console.error('Diary not found:', uuid);
		navigate(-1);
		return;
	}

	return (
		<>
			<TopNavigator leadingArea={<GoBack label='Diaries' />} />
			<Container vertical='small'>
				<Typo.Title weight='strong'>{diary.title}</Typo.Title>
			</Container>
			<Container vertical='small'>
				<Row align='center' justify='start' gap={8}>
					<Avatar size={32} src={localStorage.getItem('profileImage')} />
					<Typo.Body weight='medium'>
						{diaryManager.isSharedDiary(diary)
							? `Shared by ${diary.sharedBy}`
							: `by ${localStorage.getItem('name')}`}
					</Typo.Body>
				</Row>
			</Container>
			<PaddingDivider />
			<ExplorerContent label='Encrypted Data' content='asd' />
			<PaddingDivider />
			<ExplorerContent label='Nonce' content='asd' />
			<PaddingDivider />
			<Container vertical='small'>
				<Typo.Body>Share via URL is enabled</Typo.Body>
			</Container>
			<Container>
				<Column gap={8}>
					<Typo.Caption color={color.sand}>Created : 9:41 PM</Typo.Caption>
					<Typo.Caption color={color.sand}>Last Edited : 9:41 PM</Typo.Caption>
				</Column>
			</Container>
			<ButtonGroup float>
				<Button fill>Delete diary</Button>
			</ButtonGroup>
		</>
	);
}
