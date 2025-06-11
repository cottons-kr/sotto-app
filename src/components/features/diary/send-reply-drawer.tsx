import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Drawer } from '@/components/ui/drawer';
import { DrawerTitle } from '@/components/ui/drawer/title';
import { EmojiInput } from '@/components/ui/input/emoji';
import type { OverlayProps } from '@/components/ui/overlay/types';
import type { Diary } from '@/lib/managers/diary';
import { fullHeight } from '@/styles/utils.css';
import { textArea, wrapper } from './styles/send-reply-drawer.css';

interface DiarySendReplyDrawerProps {
	diary: Diary;
}

export function DiarySendReplyDrawer(
	props: DiarySendReplyDrawerProps & OverlayProps,
) {
	const { diary, close } = props;

	return (
		<Drawer close={close}>
			<DrawerTitle>Send reply</DrawerTitle>
			<Container vertical='small'>
				<Container className={wrapper} horizontal='regular'>
					<Column className={fullHeight} gap={12}>
						<EmojiInput />
						<textarea className={textArea} placeholder='Write short message' />
					</Column>
				</Container>
			</Container>
			<ButtonGroup>
				<Button fill>Send</Button>
			</ButtonGroup>
		</Drawer>
	);
}
