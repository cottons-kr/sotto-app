import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { item, list } from './styles/attachments.css';

export function DiaryAttachments() {
	return (
		<Container className={list} vertical='large' horizontal='large'>
			<Row gap={8} justify='start'>
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
			</Row>
		</Container>
	);
}

function Item() {
	return <div className={item} />;
}
