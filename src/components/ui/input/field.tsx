import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { Typo } from '../typography';
import { labelStyle } from './styles/field.css';

interface InputFieldProps extends BaseProps<HAS_CHILDREN> {
	label?: string;
}

export function InputField(props: InputFieldProps) {
	const { label, children } = props;

	return (
		<Container>
			<Column gap={6} align='center'>
				{label && (
					<Container className={labelStyle} vertical='none' horizontal='small'>
						<Typo.Body>{label}</Typo.Body>
					</Container>
				)}
				{children}
			</Column>
		</Container>
	);
}
