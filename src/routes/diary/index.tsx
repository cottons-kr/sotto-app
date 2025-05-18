import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { DiarySavingToast } from '@/components/pages/diary/saving-toast';
import { DiaryShareSection } from '@/components/pages/diary/share';
import { Divider } from '@/components/ui/divider';
import { EmojiInput } from '@/components/ui/input/emoji';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useDiary } from '@/hooks/use-diary';
import { useDrawer } from '@/hooks/use-drawer';
import { wait } from '@/lib/common';
import { diaryManager } from '@/lib/managers/diary';
import { color } from '@/styles/color.css';
import { Share } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { page, textArea, textAreaContainer, titleInput } from './page.css';

export default function DiaryPage() {
	const { toggleDrawer } = useDrawer('share-diary');
	const [searchParams] = useSearchParams();
	const diaryUUID = useMemo(() => searchParams.get('uuid'), [searchParams]);
	const [diary, { setEmoji, setTitle, setContent, setDiary }] = useDiary(diaryUUID);
	const [isSaving, setIsSaving] = useState(false);

	const saveDiary = useCallback(async () => {
		if (!diary.emoji && !diary.title && !diary.content) {
			return;
		}

		setIsSaving(true);

		if (import.meta.env.DEV) {
			// for toast development purpose
			await wait(1000);
		}

		if (diaryManager.getDiary(diary.uuid)) {
			await diaryManager.updateDiary(diary.uuid, diary);
		} else {
			await diaryManager.addDiary(diary);
		}

		setIsSaving(false);
	}, [diary]);

	return (
		<>
			<Column className={page} justify='start'>
				<TopNavigator
					leadingArea={<GoBack beforeBack={saveDiary} />}
					trailingArea={<Share onClick={isSaving ? undefined : toggleDrawer} />}
				/>
				<Container vertical='large' horizontal='large'>
					<Column gap={12}>
						<EmojiInput
							defaultValue={diary.emoji}
							onValue={setEmoji}
							disabled={isSaving}
						/>
						<input
							className={titleInput}
							placeholder='New Diary'
							value={diary.title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={isSaving}
						/>
						<Typo.Caption
							color={color.sand}
						>{`Last Edited : ${new Date(diary.updatedAt).toLocaleString()}`}</Typo.Caption>
					</Column>
				</Container>
				<Divider />
				<Container
					className={textAreaContainer}
					vertical='large'
					horizontal='large'
				>
					<textarea
						className={textArea}
						placeholder='Write your diary'
						value={diary.content}
						onChange={(e) => setContent(e.target.value)}
						disabled={isSaving}
					/>
				</Container>
			</Column>
			<DiaryShareSection diary={diary} setDiary={setDiary} />
			<DiarySavingToast visible={isSaving} />
		</>
	);
}
