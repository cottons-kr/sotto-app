import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Row } from '@/components/layout/row';
import { DiaryCard } from '@/components/ui/card/diary';
import { Drawer } from '@/components/ui/drawer';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Typo } from '@/components/ui/typography';
import type { Dayjs } from 'dayjs';

interface DiaryInDateDrawerProps {
	day: Dayjs;
	diaries: Array<Diary>;
}

export function DiaryInDateDrawer(
	props: DiaryInDateDrawerProps & OverlayProps,
) {
	const { day, diaries, close } = props;

	return (
		<Drawer close={close}>
			<Container vertical='small'>
				<Row justify='center'>
					<Typo.Body weight='strong'>{day.format('MMMM DD, YYYY')}</Typo.Body>
				</Row>
			</Container>
			<Container>
				<Grid>
					{diaries.map((d) => (
						<DiaryCard key={d.uuid} diary={d} />
					))}
				</Grid>
			</Container>
		</Drawer>
	);
}
