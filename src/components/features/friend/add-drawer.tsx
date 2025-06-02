import type { OverlayProps } from '@/components/ui/overlay/types';
import { type User, friendManager } from '@/lib/managers/friend';
import { useCallback, useState } from 'react';
import { UserPickerDrawer } from '../user/picker-drawer';

export function AddFriendDrawer(props: OverlayProps) {
	const { close } = props;
	const [isAdding, setIsAdding] = useState(false);
	const friends = friendManager.getFriends();

	const onClickAdd = useCallback(
		(selectedUsers: Array<User>) => {
			setIsAdding(true);

			for (const user of selectedUsers) {
				if (friendManager.isFriend(user.uuid)) {
					friendManager.updateFriend(user.uuid, user);
				} else {
					friendManager.addFriend(user);
				}
			}

			setIsAdding(false);
			close();
		},
		[close],
	);

	return (
		<UserPickerDrawer
			title='Add friends'
			defaultSelected={friends.map((f) => f.uuid)}
			preventBackdropClose={isAdding}
			buttons={[{ label: 'Add', loading: isAdding, onClick: onClickAdd }]}
			close={close}
		/>
	);
}
