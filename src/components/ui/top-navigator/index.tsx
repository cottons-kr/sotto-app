import { Column } from '@/components/layout/column';
import { Row } from '@/components/layout/row';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { content, spacer, topNavigator } from './styles.css';

interface TopNavigatorProps extends BaseProps<HAS_CHILDREN> {
	leadingArea?: React.ReactNode;
	trailingArea?: React.ReactNode;
}

export function TopNavigator(props: TopNavigatorProps) {
	const { leadingArea, trailingArea, children } = props;

	return (
		<>
			<Column as='nav' className={topNavigator} justify='end'>
				<Row className={content} align='center' justify='space-between'>
					{leadingArea}
					{children}
					{trailingArea}
				</Row>
			</Column>
			<div className={spacer} />
		</>
	);
}
