import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { Typo } from '../typography';

interface InputFieldProps extends BaseProps<HAS_CHILDREN> {
	label?: string;
}

export function InputField(props: InputFieldProps) {
	const { label, children } = props;

	return (
		<Container>
			<Column as='label' gap={6}>
				{label && (
					<Container vertical='none' horizontal='small'>
						<Typo.Body>{label}</Typo.Body>
					</Container>
				)}
				{children}
			</Column>
		</Container>
	);
}
