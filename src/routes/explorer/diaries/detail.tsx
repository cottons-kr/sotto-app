import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { ExplorerDiariesDeletePopup } from '@/components/pages/explorer/diaries/delete';
import { ExplorerContent } from '@/components/pages/explorer/shared/content';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { diaryManager } from '@/lib/managers/diary';
import { color } from '@/styles/color.css';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExplorerDiariesDetailPage() {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const diary = useMemo(() => diaryManager.getDiary(uuid || ''), [uuid]);
	const { show: openDiaryDelete } = useOverlay(ExplorerDiariesDeletePopup);

	const onClickDeleteDiary = useCallback(() => {
		if (diary) {
			openDiaryDelete({ diary, back: () => navigate(-1) });
		}
	}, [diary, navigate, openDiaryDelete]);

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
			<ExplorerContent
				label='Encrypted Data'
				content={diary.encryptedData?.toString() || 'No data available'}
			/>
			<PaddingDivider />
			<ExplorerContent
				label='Nonce'
				content={diary.nonce?.toString() || 'No data available'}
			/>
			<PaddingDivider />
			{/* <Container vertical='small'>
				<Typo.Body>Share via URL is enabled</Typo.Body>
			</Container> */}
			<Container>
				<Column gap={8}>
					<Typo.Caption color={color.sand}>
						Created : {new Date(diary.createdAt).toLocaleString()}
					</Typo.Caption>
					<Typo.Caption color={color.sand}>
						Last Edited : {new Date(diary.updatedAt).toLocaleString()}
					</Typo.Caption>
				</Column>
			</Container>
			<ButtonGroup float>
				<Button fill onClick={onClickDeleteDiary}>
					Delete diary
				</Button>
			</ButtonGroup>
		</>
	);
}
