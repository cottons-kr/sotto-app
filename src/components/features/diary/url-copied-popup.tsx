import { Column } from '@/components/layout/column';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import type { OverlayProps } from '@/components/ui/overlay/types';
import { Popup } from '@/components/ui/popup';
import { PopupContent } from '@/components/ui/popup/content';
import { useOverlay } from '@/hooks/use-overlay';
import { color } from '@/styles/color.css';
import { ClipboardCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback } from 'react';

interface DiaryURLCopiedPopupProps {
	url: string;
}

export function DiaryURLCopiedPopup(
	props: DiaryURLCopiedPopupProps & OverlayProps,
) {
	const { url, close } = props;

	const { show: showQR } = useOverlay(QRPopup);

	const onClickQR = useCallback(() => {
		showQR({ url });
	}, [url, showQR]);

	return (
		<Popup>
			<PopupContent
				icon={<ClipboardCheck />}
				title='URL Copied to clipboard'
				description='Anyone have URL can see this diary'
			/>
			<ButtonGroup smallPadding>
				<Button fill variant='secondary' onClick={onClickQR}>
					Show QR Code
				</Button>
				<Button fill onClick={close}>
					OK
				</Button>
			</ButtonGroup>
		</Popup>
	);
}

interface QRPopupProps {
	url: string;
}

function QRPopup(props: QRPopupProps & OverlayProps) {
	const { url, close } = props;

	return (
		<Popup>
			<Column align='center' gap={8}>
				<QRCodeSVG
					value={url}
					size={196}
					level='L'
					marginSize={4}
					bgColor={color.milk}
					fgColor={color.mud}
				/>
				<ButtonGroup smallPadding>
					<Button fill onClick={close}>
						Close
					</Button>
				</ButtonGroup>
			</Column>
		</Popup>
	);
}
