import { fetch } from '@tauri-apps/plugin-http';
import { storageClient } from './storage';

interface APIResponse<T> {
	status: number;
	message: string;
	data: T | null;
	responseAt: string;
}

const DEFAULT_API_URL = 'http://localhost:3000' as const;

class APIClient {
	constructor(private baseUrl: string) {
		if (baseUrl === DEFAULT_API_URL) {
			console.warn(
				'Using default API URL. Make sure to set the VITE_API_URL environment variable in production.',
			);
		}
	}

	private async request<T>(
		path: string,
		method: string,
		body?: unknown,
	): Promise<T> {
		const url = new URL(path, this.baseUrl).toString();

		let accessToken: string | null = null;
		if (storageClient.isInitialized) {
			accessToken = await storageClient.get('accessToken');
		}

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: accessToken ? `Bearer ${accessToken}` : '',
				},
				body: isBodyContainable(method) ? JSON.stringify(body) : undefined,
			});

			console.log(new Date().toISOString(), 'API Request', method, url, body);

			const data: APIResponse<T> = await response.json();

			console.log(new Date().toISOString(), 'API Response', method, url, data);

			if (!response.ok || data.data === null) {
				throw new Error(data.message);
			}

			return data.data;
		} catch (error) {
			console.error('API request failed:', error);
			return Promise.reject(error);
		}
	}

	async get<T>(path: string): Promise<T> {
		return this.request<T>(path, 'GET');
	}

	async post<T>(path: string, data: unknown): Promise<T> {
		return this.request<T>(path, 'POST', data);
	}

	async patch<T>(path: string, data: unknown): Promise<T> {
		return this.request<T>(path, 'PATCH', data);
	}

	async delete<T>(path: string): Promise<T> {
		return this.request<T>(path, 'DELETE');
	}
}

export const apiClient = new APIClient(
	import.meta.env.VITE_API_URL || DEFAULT_API_URL,
);

function isBodyContainable(method: string): boolean {
	return (
		method === 'POST' ||
		method === 'PUT' ||
		method === 'PATCH' ||
		method === 'DELETE'
	);
}
