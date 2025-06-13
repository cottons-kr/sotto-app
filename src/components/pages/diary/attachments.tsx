import { AttachmentFocus } from '@/components/features/attachment/focus';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { cn } from '@/lib/common';
import type { Attachment as AttachmentType } from '@/lib/managers/diary';
import { fileStorage } from '@/lib/managers/file';
import { fullHeight } from '@/styles/utils.css';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { message } from '@tauri-apps/plugin-dialog';
import { ImagePlus } from 'lucide-react';
import {
	type ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { v4 } from 'uuid';
import { DiaryContext } from './context';
import { image, input, item, list } from './styles/attachments.css';

export function DiaryAttachments() {
	const { diary } = useContext(DiaryContext);

	return (
		<Container className={list} vertical='large' horizontal='large'>
			<Row gap={8} justify='start'>
				{diary.attachments.length < 5 && <AddPhoto />}
				{diary.attachments.map((a, i) => (
					<Attachment key={i.toString()} attachment={a} />
				))}
			</Row>
		</Container>
	);
}

function AddPhoto() {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		diary,
		diaryDispatch: { setAttachments },
	} = useContext(DiaryContext);

	const onClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	}, []);

	const onChange = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (!files || files.length === 0) return;
			const fileList = Array.from(files).filter(
				(file) => file.size <= 3.5 * 1024 * 1024,
			);
			if (diary.attachments.length + fileList.length > 5) {
				await message('You can only add up to 5 photos.', { kind: 'error' });
				return;
			}
			if (fileList.length < files.length) {
				await message(
					'Some files were too large and were not added. Maximum size is 3.5MB.',
				);
			}

			if (fileList.length === 0) {
				await message('No valid files were selected.');
				return;
			}

			const newAttachments = await Promise.all(
				fileList.map(async (file) => {
					const id = v4();
					await fileStorage.saveFile(id, file);
					return { localId: id };
				}),
			);
			setAttachments([...newAttachments, ...diary.attachments]);
		},
		[diary.attachments, setAttachments],
	);

	return (
		<Item onClick={onClick}>
			<Column className={fullHeight} gap={8} align='center'>
				<ImagePlus />
				<Typo.Caption weight='medium'>Add photo</Typo.Caption>
			</Column>
			<input
				ref={inputRef}
				className={input}
				type='file'
				accept='image/*'
				multiple
				onChange={onChange}
			/>
		</Item>
	);
}

interface AttachmentProps {
	attachment: AttachmentType;
}

function Attachment(props: AttachmentProps) {
	const { attachment } = props;

	const [isLoading, setIsLoading] = useState(true);
	const [previewUrl, setPreviewUrl] = useState('');
	const {
		diary,
		diaryDispatch: { setAttachments },
	} = useContext(DiaryContext);
	const { show: showFocus, hide: hideFocus } = useOverlay(AttachmentFocus);

	const getAttachment = useCallback(async () => {
		if (diary.readonly) {
			throw new Error('not implemented');
		}
		const saved = await fileStorage.getFile(attachment.localId);
		if (!saved) {
			throw new Error('File not found');
		}
		const file = saved;

		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		setIsLoading(false);
	}, [attachment, diary.readonly]);

	const deleteAttachment = useCallback(async () => {
		if (diary.readonly) {
			throw new Error('not implemented');
		}
		await fileStorage.deleteFile(attachment.localId);
		setAttachments(
			diary.attachments.filter((a) => a.localId !== attachment.localId),
		);
		URL.revokeObjectURL(previewUrl);
		hideFocus();
	}, [attachment, diary, hideFocus, previewUrl, setAttachments]);

	const onClick = useCallback(() => {
		showFocus({ previewUrl, handleDelete: deleteAttachment });
	}, [previewUrl, showFocus, deleteAttachment]);

	useEffect(() => {
		getAttachment();
	}, [getAttachment]);

	return (
		<Item>
			{isLoading ? (
				<Column className={fullHeight} align='center'>
					<LoadingCircle />
				</Column>
			) : (
				<img
					className={image}
					src={previewUrl}
					alt='Attachment preview'
					draggable={false}
					onClick={onClick}
				/>
			)}
		</Item>
	);
}

interface ItemProps extends BaseProps<HAS_CHILDREN> {
	onClick?: () => unknown;
}

function Item(props: ItemProps) {
	const { className, children, onClick } = props;

	return (
		<div className={cn(item, className)} onClick={onClick}>
			{children}
		</div>
	);
}
