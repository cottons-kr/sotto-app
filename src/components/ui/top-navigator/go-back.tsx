import { Row } from '@/components/layout/row';
import { ChevronLeft } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typo } from '../typography';

export function GoBack() {
	const navigate = useNavigate();

	const onClickBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	return (
		<Row as='button' gap={4} align='center' onClick={onClickBack}>
			<ChevronLeft />
			<Typo.Body>Back</Typo.Body>
		</Row>
	);
}
