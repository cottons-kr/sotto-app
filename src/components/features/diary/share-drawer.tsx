import type { OverlayProps } from '@/components/ui/overlay/types';
import { type Diary, diaryManager } from '@/lib/managers/diary';
import type { User } from '@/lib/managers/friend';
import { message } from '@tauri-apps/plugin-dialog';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useState,
} from 'react';
import { UserPickerDrawer } from '../user/picker-drawer';

interface DiaryShareDrawerProps {
	diary: Diary;
	setDiary: Dispatch<SetStateAction<Diary>>;
}

export function ShareDiaryDrawer(props: DiaryShareDrawerProps & OverlayProps) {
	const { diary, setDiary, close } = props;
	const [isSharing, setIsSharing] = useState(false);

	const onClickShare = useCallback(
		async (selectedUsers: Array<User>) => {
			if (!diary.emoji && !diary.title && !diary.content) {
				await message('Please add some content to your diary before sharing.');
				return;
			}

			setIsSharing(true);

			let uuid = diary.uuid;
			if (uuid === 'NOT_SAVED') {
				const savedDiary = await diaryManager.addDiary(diary);
				uuid = savedDiary.uuid;
			}
			const result = await diaryManager.shareDiary(uuid, selectedUsers);
			setDiary(result);

			setIsSharing(false);
			close();
		},
		[diary, setDiary, close],
	);

	return (
		<UserPickerDrawer
			title='Share with your friends'
			preventBackdropClose={isSharing}
			buttons={[{ label: 'Apply', loading: isSharing, onClick: onClickShare }]}
			close={close}
		/>
	);
}
