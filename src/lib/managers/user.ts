import { apiClient } from './http';

export interface User {
	uuid: string;
	name: string;
	username: string;
	publicKey: string;
}

class UserManager {
	private cache: Map<string, User> = new Map();

	constructor() {
		if (typeof window !== 'undefined') {
			const cachedUsers = localStorage.getItem('cached-users');
			if (cachedUsers) {
				const parsedUsers = JSON.parse(cachedUsers);
				this.cache = new Map<string, User>(Object.entries(parsedUsers));
			}
		}
	}

	private isCached(uuid: string) {
		return this.cache.has(uuid);
	}

	private async cacheUser(user: User) {
		this.cache.set(user.uuid, user);
	}

	private async fetchUserFromServer(uuid: string) {
		try {
			const res = await apiClient.get<User>(`/users/${uuid}`);
			await this.cacheUser(res);
			return res;
		} catch (error) {
			console.error('Error fetching user from server:', error);
			throw error;
		}
	}

	private async getUserFromCache(uuid: string) {
		return this.cache.get(uuid);
	}

	async getUser(uuid: string) {
		if (this.isCached(uuid)) {
			return this.getUserFromCache(uuid);
		}
		return this.fetchUserFromServer(uuid);
	}
}

export const userManager = new UserManager();
