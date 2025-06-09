import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Typo } from '@/components/ui/typography';
import { color } from '@/styles/color.css';
import { fullHeight } from '@/styles/utils.css';
import { Building, House, School } from 'lucide-react';
import { grid, item } from './styles/presets.css';

export function ExplorerLocationAliasPresets() {
	return (
		<Container className={grid}>
			<Item icon={<House size={32} />} name='Home' />
			<Item icon={<House size={32} />} name='Home 2' />
			<Item icon={<School size={32} />} name='School' />
			<Item icon={<Building size={32} />} name='Work' />
		</Container>
	);
}

interface ItemProps {
	icon: React.ReactNode;
	name: string;
}

function Item(props: ItemProps) {
	const { icon, name } = props;

	return (
		<Container className={item}>
			<Column className={fullHeight} gap={12} align='center' justify='center'>
				{icon}
				<Column gap={4} align='center'>
					<Typo.Lead weight='medium'>{name}</Typo.Lead>
					<Typo.Body color={color.sand}>Click to add</Typo.Body>
				</Column>
			</Column>
		</Container>
	);
}
