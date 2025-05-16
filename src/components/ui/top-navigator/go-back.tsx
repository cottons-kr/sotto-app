import { Row } from '@/components/layout/row';
import { ChevronLeft } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typo } from '../typography';

interface GoBackProps {
	beforeBack?: () => unknown;
}

export function GoBack(props: GoBackProps) {
	const { beforeBack } = props;

	const navigate = useNavigate();

	const onClickBack = useCallback(async () => {
		if (beforeBack) {
			await beforeBack();
		}
		navigate(-1);
	}, [beforeBack, navigate]);

	return (
		<Row as='button' gap={4} align='center' onClick={onClickBack}>
			<ChevronLeft />
			<Typo.Body>Back</Typo.Body>
		</Row>
	);
}
