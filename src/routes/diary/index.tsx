import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { DiarySavingPopup } from '@/components/pages/diary/saving-popup';
import { DiaryShareDrawer } from '@/components/pages/diary/share';
import { Divider } from '@/components/ui/divider';
import { EmojiInput } from '@/components/ui/input/emoji';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useDiary } from '@/hooks/use-diary';
import { useDrawer } from '@/hooks/use-drawer';
import { log } from '@/lib/log';
import { diaryManager } from '@/lib/managers/diary';
import { color } from '@/styles/color.css';
import { Share } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { page, textArea, textAreaContainer, titleInput } from './page.css';

export default function DiaryPage() {
	const [searchParams] = useSearchParams();
	const diaryUUID = useMemo(() => searchParams.get('uuid'), [searchParams]);
	const isReadOnly = useMemo(
		() => searchParams.get('readonly') === 'true',
		[searchParams],
	);
	const [diary, { setEmoji, setTitle, setContent, setDiary }] =
		useDiary(diaryUUID);
	const [isSaving, setIsSaving] = useState(false);
	const { show: showShareDrawer } = useDrawer(DiaryShareDrawer);

	const saveDiary = useCallback(async () => {
		if ((!diary.emoji && !diary.title && !diary.content) || diary.readonly) {
			return;
		}

		setIsSaving(true);

		try {
			if (diaryManager.getDiary(diary.uuid)) {
				await diaryManager.updateDiary(diary.uuid, diary);
			} else {
				await diaryManager.addDiary(diary);
			}
		} catch (error) {
			log('error', 'Error while saving diary', error);
			console.error('Error while saving diary', error);
		} finally {
			setIsSaving(false);
		}
	}, [diary]);

	const openShareDrawer = useCallback(() => {
		showShareDrawer({
			diary,
			setDiary,
		});
	}, [showShareDrawer, diary, setDiary]);

	return (
		<>
			<Column className={page} justify='start'>
				<TopNavigator
					leadingArea={<GoBack beforeBack={saveDiary} />}
					trailingArea={
						isReadOnly ? undefined : (
							<Share onClick={isSaving ? undefined : openShareDrawer} />
						)
					}
				/>
				<Container vertical='large' horizontal='large'>
					<Column gap={12}>
						<EmojiInput
							defaultValue={diary.emoji}
							onValue={setEmoji}
							disabled={isSaving || isReadOnly}
						/>
						<input
							className={titleInput}
							placeholder='New Diary'
							value={diary.title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={isSaving || isReadOnly}
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
						disabled={isSaving || isReadOnly}
					/>
				</Container>
			</Column>
			<DiarySavingPopup visible={isSaving} />
		</>
	);
}
