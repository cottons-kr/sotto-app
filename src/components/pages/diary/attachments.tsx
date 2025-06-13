import { AttachmentFocus } from '@/components/features/attachment/focus';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { cn } from '@/lib/common';
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
				{diary.attachments.map((id) => (
					<Attachment key={id} attachmentId={id} />
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
					return `local:${id}`;
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
	attachmentId: string;
}

function Attachment(props: AttachmentProps) {
	const { attachmentId } = props;

	const [isLoading, setIsLoading] = useState(true);
	const [previewUrl, setPreviewUrl] = useState('');
	const { show: showFocus } = useOverlay(AttachmentFocus);

	const getAttachment = useCallback(async () => {
		const isLocal = attachmentId.startsWith('local:');
		let file: File;
		if (isLocal) {
			const saved = await fileStorage.getFile(
				attachmentId.replace('local:', ''),
			);
			if (!saved) {
				throw new Error('File not found');
			}
			file = saved;
		} else {
			throw new Error('not implemented');
		}

		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		setIsLoading(false);
	}, [attachmentId]);

	const onClick = useCallback(() => {
		showFocus({ previewUrl });
	}, [previewUrl, showFocus]);

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
					alt={attachmentId}
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
