import { Column } from '@/components/layout/column';
import type { User } from '@/lib/managers/friend';
import { Check } from 'lucide-react';
import { Avatar } from '.';
import { Typo } from '../typography';
import { avatar, check, item } from './styles/item.css';

interface AvatarItemProps {
	user: User;
	selected?: boolean;
	onClick?: () => unknown;
}

export function AvatarItem(props: AvatarItemProps) {
	const { user, selected, onClick } = props;

	return (
		<Column className={item} gap={8} align='center' onClick={onClick}>
			<div className={avatar}>
				<Avatar size={48} src={user.profileUrl} />
				{selected && (
					<div className={check}>
						<Check size={16} />
					</div>
				)}
			</div>
			<Typo.Caption>{user.name}</Typo.Caption>
		</Column>
	);
}
