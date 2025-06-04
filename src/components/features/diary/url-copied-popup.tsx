import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { ClipboardCheck } from 'lucide-react';

export function DiaryURLCopiedPopup(props: OverlayProps) {
	const { close } = props;

	return (
		<Popup>
			<PopupContent
				icon={<ClipboardCheck />}
				title='URL Copied to clipboard'
				description='Anyone have URL can see this diary'
			/>
			<ButtonGroup smallPadding>
				<Button fill onClick={close}>
					OK
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
