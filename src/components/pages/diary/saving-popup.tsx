import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { LoadingCircle } from '@/components/ui/loading-circle';
import { Popup } from '@/components/ui/popup';
import { Typo } from '@/components/ui/typography';

export function DiarySavingPopup() {
	return (
		<Popup fill={false}>
			<Container vertical='small'>
				<Column align='center' gap={12}>
					<LoadingCircle size={48} />
					<Typo.Body>Saving</Typo.Body>
				</Column>
			</Container>
		</Popup>
	);
}
