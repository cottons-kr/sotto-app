import type { OverlayProps } from '@/components/ui/overlay/types';
import { useOverlay } from '@/hooks/use-overlay';
import { type Diary, diaryManager } from '@/lib/managers/diary';
import type { User } from '@/lib/managers/friend';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { message } from '@tauri-apps/plugin-dialog';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { UserPickerDrawer } from '../user/picker-drawer';
import { DiaryStopURLSharingPopup } from './stop-url-sharing-popup';
import { DiaryURLCopiedPopup } from './url-copied-popup';

interface DiaryShareDrawerProps {
	diary: Diary;
	setDiary: Dispatch<SetStateAction<Diary>>;
}

export function ShareDiaryDrawer(props: DiaryShareDrawerProps & OverlayProps) {
	const { diary, setDiary, close } = props;
	const [isProcessing, setIsProcessing] = useState(false);
	const isSharable = useMemo(
		() => diary.emoji || diary.title || diary.content,
		[diary],
	);
	const { show: openURLCopied } = useOverlay(DiaryURLCopiedPopup);
	const { show: openStopURLSharing } = useOverlay(DiaryStopURLSharingPopup);

	const onClickShare = useCallback(
		async (selectedUsers: Array<User>) => {
			if (!isSharable) {
				await message('Please add some content to your diary before sharing.');
				return;
			}

			setIsProcessing(true);

			let uuid = diary.uuid;
			if (uuid === 'NOT_SAVED') {
				const savedDiary = await diaryManager.addDiary(diary);
				uuid = savedDiary.uuid;
			}
			const result = await diaryManager.shareDiary(uuid, selectedUsers);
			setDiary(result);

			setIsProcessing(false);
			close();
		},
		[diary, isSharable, setDiary, close],
	);

	const onClickShareViaUrl = useCallback(async () => {
		if (!isSharable) {
			await message('Please add some content to your diary before sharing.');
			return;
		}

		try {
			let uuid = diary.uuid;
			if (uuid === 'NOT_SAVED') {
				const savedDiary = await diaryManager.addDiary(diary);
				uuid = savedDiary.uuid;
			}

			const { url, diary: result } = await diaryManager.shareDiaryViaURL(uuid);
			setDiary(result);
			await writeText(url);
			openURLCopied({});
		} finally {
			setIsProcessing(false);
		}
	}, [isSharable, diary, setDiary, openURLCopied]);

	const onStopUrlSharingClick = useCallback(async () => {
		if (!diary.isSharedViaURL) {
			await message('This diary is not shared via URL.');
			return;
		}

		setIsProcessing(true);

		try {
			await diaryManager.stopURLSharingAndReEncrypt(diary.uuid);
		} finally {
			setIsProcessing(false);
		}
	}, [diary.isSharedViaURL, diary.uuid]);

	const onClickStopShareViaUrl = useCallback(() => {
		openStopURLSharing({
			onStopUrlSharingClick,
		});
	}, [openStopURLSharing, onStopUrlSharingClick]);

	return (
		<UserPickerDrawer
			title='Share with your friends'
			buttons={[
				{
					label: diary.isSharedViaURL ? 'Stop URL Sharing' : 'Share via URL',
					variant: 'secondary',
					loading: isProcessing,
					onClick: diary.isSharedViaURL
						? onClickStopShareViaUrl
						: onClickShareViaUrl,
				},
				{ label: 'Apply', loading: isProcessing, onClick: onClickShare },
			]}
			defaultSelected={diary.sharedWith}
			close={close}
		/>
	);
}
