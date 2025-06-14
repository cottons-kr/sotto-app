import { ShareDiaryDrawer } from '@/components/features/diary/share-drawer';
import { ReplyListDrawer } from '@/components/features/reply/list-drawer';
import { ReplySendDrawer } from '@/components/features/reply/send-drawer';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { DiaryAdditionalInfo } from '@/components/pages/diary/additional-info';
import { DiaryAttachments } from '@/components/pages/diary/attachments';
import { DiaryContext } from '@/components/pages/diary/context';
import { DiarySavingPopup } from '@/components/pages/diary/saving-popup';
import { Divider } from '@/components/ui/divider';
import { EmojiInput } from '@/components/ui/input/emoji';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useDiary } from '@/hooks/use-diary';
import { useOverlay } from '@/hooks/use-overlay';
import { log } from '@/lib/log';
import { diaryManager } from '@/lib/managers/diary';
import { color } from '@/styles/color.css';
import { message } from '@tauri-apps/plugin-dialog';
import { MessageCircle, Share, SmilePlus } from 'lucide-react';
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
	const [diary, diaryDispatch] = useDiary(diaryUUID);
	const { setDiary, setEmoji, setTitle, setContent } = diaryDispatch;
	const [isAttachmentUpdated, setIsAttachmentUpdated] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { show: openShareDrawer } = useOverlay(ShareDiaryDrawer, {
		preventBackdropClose: isSaving,
	});
	const { show: openSavingPopup, hide: closeSavingPopup } = useOverlay(
		DiarySavingPopup,
		{ preventBackdropClose: true },
	);
	const { show: openSendReply } = useOverlay(ReplySendDrawer);
	const { show: openReplies } = useOverlay(ReplyListDrawer);

	const saveDiary = useCallback(
		async (next: () => void) => {
			if ((!diary.emoji && !diary.title && !diary.content) || diary.readonly) {
				next();
				return;
			}

			setIsSaving(true);
			openSavingPopup({});

			try {
				if (diaryManager.getDiary(diary.uuid)) {
					await diaryManager.updateDiary(
						diary.uuid,
						diary,
						isAttachmentUpdated,
					);
				} else {
					await diaryManager.addDiary(diary);
				}
				next();
			} catch (error) {
				log('error', 'Error while saving diary', error);
				await message('Failed to save diary. Please try again.');
			} finally {
				setIsSaving(false);
				closeSavingPopup();
			}
		},
		[diary, isAttachmentUpdated, openSavingPopup, closeSavingPopup],
	);

	const onClickShare = useCallback(() => {
		openShareDrawer({ diary, isAttachmentUpdated, setDiary });
	}, [diary, isAttachmentUpdated, setDiary, openShareDrawer]);

	const onClickSendReply = useCallback(() => {
		openSendReply({ diary });
	}, [diary, openSendReply]);

	const onClickViewReplies = useCallback(() => {
		openReplies({ diary });
	}, [diary, openReplies]);

	return (
		<DiaryContext
			value={{
				diary,
				diaryDispatch,
				isAttachmentUpdated,
				setIsAttachmentUpdated,
			}}
		>
			<Column className={page} justify='start'>
				<TopNavigator
					leadingArea={<GoBack beforeBack={saveDiary} />}
					trailingArea={
						isReadOnly ? (
							<SmilePlus onClick={onClickSendReply} />
						) : (
							<Row gap={16}>
								{diary.shareUUID && (
									<MessageCircle onClick={onClickViewReplies} />
								)}
								<Share onClick={onClickShare} />
							</Row>
						)
					}
				/>
				<Container vertical='large' horizontal='large'>
					<Column gap={24}>
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
						<DiaryAdditionalInfo />
					</Column>
				</Container>
				<Divider />
				<DiaryAttachments />
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
		</DiaryContext>
	);
}
