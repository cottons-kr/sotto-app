import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

interface DiaryStopURLSharingPopupProps {
	onStopUrlSharingClick: () => unknown;
}

export function DiaryStopURLSharingPopup(
	props: DiaryStopURLSharingPopupProps & OverlayProps,
) {
	const { onStopUrlSharingClick, close } = props;

	const onClickStop = useCallback(() => {
		try {
			onStopUrlSharingClick();
		} finally {
			close();
		}
	}, [onStopUrlSharingClick, close]);

	return (
		<Popup>
			<PopupContent
				icon={<TriangleAlert />}
				title='Stop URL sharing?'
				description='Existing URL will be useless and cannot undo'
			/>
			<ButtonGroup smallPadding>
				<Button fill onClick={onClickStop}>
					Stop
				</Button>
				<Button fill variant='secondary' onClick={close}>
					Cancel
				</Button>
			</ButtonGroup>
		</Popup>
	);
}
