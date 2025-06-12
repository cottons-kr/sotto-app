import { encryptJson } from '@/binding/function/encrypt-json';
import { encryptKeyForRecipient } from '@/binding/function/encrypt-key-for-recipient';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { EmojiInput } from '@/components/ui/input/emoji';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { log } from '@/lib/log';
import type { Diary } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { fullHeight } from '@/styles/utils.css';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';
import { textArea, wrapper } from './styles/send-reply-drawer.css';

interface DiarySendReplyDrawerProps {
	diary: Diary;
}

export function DiarySendReplyDrawer(
	props: DiarySendReplyDrawerProps & OverlayProps,
) {
	const { diary, close } = props;

	const [emoji, setEmoji] = useState('');
	const [content, setContent] = useState('');
	const [isSending, setIsSending] = useState(false);

	const onClickSend = useCallback(async () => {
		if (!content) {
			await message('Please enter a message');
			return;
		}

		const user = friendManager.getFriend(diary.sharedBy || '');
		if (!user) {
			await message('User not found');
			return;
		}

		try {
			setIsSending(true);

			const [data, key, nonce] = await encryptJson({ emoji, content });
			const encryptedKey = await encryptKeyForRecipient(user.publicKey, key);

			await apiClient.post('/replies', {
				diaryId: diary.uuid,
				data,
				nonce,
				encryptedKey,
			});
			close();
		} catch (error) {
			log('error', 'Failed to send reply', error);
			await message(`Failed to send reply: ${error}`);
			return;
		} finally {
			setIsSending(false);
		}
	}, [diary, emoji, content, close]);

	return (
		<Drawer close={close}>
			<DrawerTitle>Send reply</DrawerTitle>
			<Container vertical='small'>
				<Container className={wrapper} horizontal='regular'>
					<Column className={fullHeight} gap={12}>
						<EmojiInput defaultValue={emoji} onValue={setEmoji} />
						<textarea
							className={textArea}
							placeholder='Write short message'
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</Column>
				</Container>
			</Container>
			<ButtonGroup>
				<Button fill onClick={onClickSend} loading={isSending}>
					Send
				</Button>
			</ButtonGroup>
		</Drawer>
	);
}
