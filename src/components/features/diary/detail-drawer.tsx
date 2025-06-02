import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { Drawer } from '@/components/ui/drawer';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import { calculateDiffDays } from '@/lib/common';
import type { Diary } from '@/lib/managers/diary';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import {
	card,
	preventOverflow,
	preview,
	title,
} from './styles/detail-drawer.css';

interface DiaryDetailDrawerProps extends BaseProps<HAS_CHILDREN> {
	diary: Diary;
}

export function DiaryDetailDrawer(
	props: DiaryDetailDrawerProps & OverlayProps,
) {
	const { diary, children, close } = props;
	const diffDays = calculateDiffDays(new Date(diary.createdAt));

	return (
		<Drawer close={close}>
			<Container vertical='small'>
				<Container className={card}>
					<Row>
						<Column
							className={preventOverflow}
							gap={6}
							justify='end'
							align='start'
						>
							<Typo.Lead>{diary.emoji}</Typo.Lead>
							<Column className={preventOverflow} gap={2} align='start'>
								<Typo.Body className={title} weight='strong'>
									{diary.title || 'Untitled'}
								</Typo.Body>
								<Typo.Caption className={preview}>
									{diary.content.split('\n')[0].trim() || 'No content yet :('}
								</Typo.Caption>
							</Column>
						</Column>
						<Typo.Caption>
							{diffDays === 0
								? 'Today'
								: diffDays === 1
									? 'Yesterday'
									: `${diffDays} days ago`}
						</Typo.Caption>
					</Row>
				</Container>
			</Container>
			{children}
		</Drawer>
	);
}
