import { DeleteDiaryPopup } from '@/components/features/diary/delete-popup';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
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
import { friendManager } from '@/lib/managers/friend';
import { color } from '@/styles/color.css';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExplorerDiariesDetailPage() {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const diary = useMemo(() => diaryManager.getDiary(uuid || ''), [uuid]);
	const { show: openDiaryDelete } = useOverlay(DeleteDiaryPopup);

	const onClickDeleteDiary = useCallback(() => {
		if (diary) {
			openDiaryDelete({ diary, callback: () => navigate(-1) });
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
					<Avatar
						size={32}
						src={
							diary.sharedBy
								? friendManager.getFriend(diary.sharedBy)?.profileUrl
								: localStorage.getItem('profileImage')
						}
					/>
					<Typo.Body weight='medium'>
						{diary.sharedBy
							? `Shared by ${friendManager.getFriend(diary.sharedBy)?.name}`
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
			{diary.encryptedKey && (
				<ExplorerContent
					label='Encrypted Key'
					content={diary.encryptedKey?.toString() || 'No data available'}
				/>
			)}
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
