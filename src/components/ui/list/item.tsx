import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import type { ReactNode } from 'react';
import { item } from './item.css';

interface ListItemProps {
	leadingArea?: ReactNode;
	trailingArea?: ReactNode;
	onClick?: () => unknown;
}

export function ListItem(props: ListItemProps) {
	const { leadingArea, trailingArea, onClick } = props;

	return (
		<Container className={item}>
			<Row align='center' justify='space-between' gap={8} onClick={onClick}>
				{leadingArea}
				{trailingArea}
			</Row>
		</Container>
	);
}
