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

	isCached(uuid: string) {
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
}

export const userManager = new FriendManager();
