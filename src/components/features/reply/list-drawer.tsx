import { decryptReply } from '@/binding/function/decrypt-reply';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { LoadingCircle } from '@/components/ui/loading-circle';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { log } from '@/lib/log';
import type { Diary, Reply } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { apiClient } from '@/lib/managers/http';
import { storageClient } from '@/lib/managers/storage';
import { message } from '@tauri-apps/plugin-dialog';
import { X } from 'lucide-react';
import { type MouseEvent, useCallback, useEffect, useState } from 'react';
import { ReplyDeletePopup } from './delete-popup';
import { content, list } from './styles/replies-drawer.css';

interface ReplyListDrawerProps {
	diary: Diary;
}

export function ReplyListDrawer(props: ReplyListDrawerProps & OverlayProps) {
	const { diary, close } = props;

	const [replies, setReplies] = useState<Array<Reply>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isInitialized, setIsInitialized] = useState(false);

	const fetchReplies = useCallback(async () => {
		setIsLoading(true);

		try {
			const replies = await apiClient.get<RepliesResponse>(
				`/replies?diaryId=${diary.shareUUID}`,
			);
			const privateKey = await storageClient.get('privateKey');
			if (!privateKey) {
				log('error', 'Private key not found');
				throw new Error('Private key not found');
			}
			const decryptedReplies = await Promise.all(
				replies.map(async (reply) => ({
					uuid: reply.uuid,
					diaryId: reply.diaryId,
					authorId: reply.authorId,
					...(await decryptReply(
						privateKey,
						reply.data,
						reply.encryptedKey,
						reply.nonce,
					)),
					createdAt: new Date(reply.createdAt),
				})),
			);
			setReplies(decryptedReplies);
		} catch (error) {
			log('error', 'Failed to fetch replies', error);
			await message(`Failed to fetch replies: ${error}`);
			close();
		} finally {
			setIsLoading(false);
		}
	}, [diary.shareUUID, close]);

	useEffect(() => {
		if (!isInitialized) {
			fetchReplies();
			setIsInitialized(true);
		}
	}, [isInitialized, fetchReplies]);

	return (
		<Drawer close={close}>
			<DrawerTitle>Replies</DrawerTitle>
			{isLoading ? (
				<Container vertical='large'>
					<Row justify='center'>
						<LoadingCircle />
					</Row>
				</Container>
			) : (
				<Column className={list}>
					{replies.map((reply, i) => (
						<Item key={i.toString()} reply={reply} onDelete={fetchReplies} />
					))}
				</Column>
			)}
		</Drawer>
	);
}

interface ItemProps {
	reply: Reply;
	onDelete: () => unknown;
}

function Item(props: ItemProps) {
	const { reply, onDelete } = props;

	const { show: openDelete } = useOverlay(ReplyDeletePopup);

	const onClickDelete = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();
			openDelete({ reply, onDelete });
		},
		[reply, onDelete, openDelete],
	);

	const author = friendManager.getFriend(reply.authorId);
	if (!author) {
		return null;
	}

	return (
		<Container>
			<Column gap={12}>
				<Row align='center' justify='space-between'>
					<Row gap={6} align='center'>
						<Avatar size={24} src={author.profileUrl} />
						<Typo.Caption weight='medium'>{author.name}</Typo.Caption>
					</Row>
					<X size={20} onClick={onClickDelete} />
				</Row>
				<Container className={content} vertical='regular'>
					<Column gap={8}>
						{reply.emoji && <Typo.Lead>{reply.emoji}</Typo.Lead>}
						<Typo.Body>{reply.content}</Typo.Body>
					</Column>
				</Container>
			</Column>
		</Container>
	);
}
