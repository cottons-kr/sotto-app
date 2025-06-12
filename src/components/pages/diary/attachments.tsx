import { AttachmentUploadPopup } from '@/components/features/attachment/upload-popup';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Typo } from '@/components/ui/typography';
import { useOverlay } from '@/hooks/use-overlay';
import { cn } from '@/lib/common';
import { fullHeight } from '@/styles/utils.css';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { message } from '@tauri-apps/plugin-dialog';
import { ImagePlus } from 'lucide-react';
import { type ChangeEvent, useCallback, useContext, useRef } from 'react';
import { DiaryContext } from './context';
import { input, item, list } from './styles/attachments.css';

export function DiaryAttachments() {
	return (
		<Container className={list} vertical='large' horizontal='large'>
			<Row gap={8} justify='start'>
				<AddPhoto />
				<Item />
				<Item />
				<Item />
				<Item />
			</Row>
		</Container>
	);
}

function AddPhoto() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { diary } = useContext(DiaryContext);
	const { show: openUpload } = useOverlay(AttachmentUploadPopup, {
		preventBackdropClose: true,
	});

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
			if (fileList.length === 0) return;
			if (fileList.length > 5) {
				await message('You can only add up to 5 photos.', { kind: 'error' });
				return;
			}
			if (fileList.length < files.length) {
				await message(
					'Some files were too large and were not added. Maximum size is 3.5MB.',
				);
			}

			openUpload({
				diary,
				attachments: fileList,
			});
		},
		[diary, openUpload],
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
