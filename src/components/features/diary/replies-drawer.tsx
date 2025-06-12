import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Avatar } from '@/components/ui/avatar';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import type { Diary } from '@/lib/managers/diary';
import { X } from 'lucide-react';
import { content, list } from './styles/replies-drawer.css';

interface DiaryRepliesDrawerProps {
	diary: Diary;
}

export function DiaryRepliesDrawer(
	props: DiaryRepliesDrawerProps & OverlayProps,
) {
	const { diary, close } = props;

	return (
		<Drawer close={close}>
			<DrawerTitle>Replies</DrawerTitle>
			<Column className={list}>
				<Item />
			</Column>
		</Drawer>
	);
}

function Item() {
	return (
		<Container>
			<Column gap={12}>
				<Row align='center' justify='space-between'>
					<Row gap={6} align='center'>
						<Avatar size={24} />
						<Typo.Caption weight='medium'>Yuchan Han</Typo.Caption>
					</Row>
					<X size={20} />
				</Row>
				<Container className={content} vertical='regular'>
					<Column gap={8}>
						<Typo.Lead>😀</Typo.Lead>
						<Typo.Body>Message content</Typo.Body>
					</Column>
				</Container>
			</Column>
		</Container>
	);
}
