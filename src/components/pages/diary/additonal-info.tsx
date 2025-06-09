import { Row } from '@/components/layout/row';
import { Typo } from '@/components/ui/typography';
import { Cloud, MapPin } from 'lucide-react';
import { item } from './styles/additional-info.css';

export function DiaryAdditionalInfo() {
	return (
		<Row gap={8}>
			<Row className={item} gap={6} align='center'>
				<MapPin size={20} />
				<Typo.Body weight='medium'>Seoul</Typo.Body>
			</Row>
			<Row className={item} gap={6} align='center'>
				<Cloud size={20} />
				<Typo.Body weight='medium'>Cloudy</Typo.Body>
			</Row>
		</Row>
	);
}
