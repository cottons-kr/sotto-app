export interface User {
	uuid: string;
	name: string;
	username: string;
	profileUrl: string;
	publicKey: string;
}

class FriendManager {
	private friends: Map<string, User> = new Map();

	constructor() {
		if (typeof window !== 'undefined') {
			const savedFriends = localStorage.getItem('saved-friends');
			if (savedFriends) {
				const parsedUsers = JSON.parse(savedFriends);
				this.friends = new Map<string, User>(Object.entries(parsedUsers));
			}
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'saved-friends',
				JSON.stringify(Object.fromEntries(this.friends)),
			);
		}
	}

	isFriend(uuid: string) {
		return this.friends.has(uuid);
	}

	cacheUser(user: User) {
		this.friends.set(user.uuid, user);
	}

	getFriends() {
		return Array.from(this.friends.values());
	}

	getFriend(uuid: string) {
		return this.friends.get(uuid);
	}

	addFriend(user: User) {
		if (this.friends.has(user.uuid)) {
			return;
		}
		this.friends.set(user.uuid, user);
		this.save();
	}

	updateFriend(uuid: string, user: User) {
		if (!this.friends.has(uuid)) {
			return;
		}
		this.friends.set(uuid, user);
		this.save();
	}

	removeFriend(uuid: string) {
		if (!this.friends.has(uuid)) {
			return;
		}
		this.friends.delete(uuid);
		this.save();
	}

	clear() {
		this.friends.clear();
		this.save();
	}
}

export const friendManager = new FriendManager();
