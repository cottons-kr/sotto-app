import { encryptData } from '@/binding/function/encrypt-data';
import { encryptKeyForRecipient } from '@/binding/function/encrypt-key-for-recipient';
import type { Dayjs } from 'dayjs';
import { v4 } from 'uuid';
import type { Weather } from '../weather';
import { fileStorage } from './file';
import { type User, friendManager } from './friend';
import { apiClient } from './http';
import { storageClient } from './storage';

export interface Diary {
	uuid: string;
	shareUUID: string | null;
	sharedBy: string | null;
	emoji: string;
	title: string;
	content: string;
	location?: string;
	weather?: Weather;
	attachments: Array<Attachment>;
	sharedWith: Array<string>;
	encryptedData: string | null;
	aesKey: string | null;
	encryptedKey: string | null;
	nonce: string | null;
	readonly: boolean;
	isSharedViaURL: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface DiaryEditable {
	emoji: string;
	title: string;
	content: string;
}

export interface Reply extends ReplyData {
	uuid: string;
	diaryId: string;
	authorId: string;
	createdAt: Date;
}

export type Attachment = {
	localId: string;
	remoteUrl?: string;
};

class DiaryManager {
	private data: Map<string, Diary> = new Map();
	public isInitialized = false;

	async init() {
		const diaries = await storageClient.get('diaries');
		if (diaries) {
			const parsedDiaries = JSON.parse(diaries);
			this.data = new Map<string, Diary>(Object.entries(parsedDiaries));
		}
		this.isInitialized = true;
	}

	private checkInitialized() {
		if (!this.isInitialized) {
			throw new Error('DiaryManager is not initialized. Call init() first.');
		}
	}

	isDiaryExists(uuid: string) {
		this.checkInitialized();
		return this.data.has(uuid);
	}

	isSharedDiaryExists(shareUUID: string) {
		this.checkInitialized();
		return Array.from(this.data.values()).some(
			(diary) => diary.shareUUID === shareUUID,
		);
	}

	private async saveData() {
		this.checkInitialized();
		await storageClient.set(
			'diaries',
			JSON.stringify(Object.fromEntries(this.data)),
		);
	}

	getDiaries() {
		return Array.from(this.data.values())
			.filter((diary) => !diary.readonly)
			.sort((a, b) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			});
	}

	getSharedDiaries() {
		return Array.from(this.data.values()).filter((diary) => diary.readonly);
	}

	getFriendDiaries(friendUUID: string) {
		return Array.from(this.data.values())
			.filter((diary) => diary.sharedBy === friendUUID)
			.sort((a, b) => {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			});
	}

	getAllDiaries() {
		return Array.from(this.data.values()).sort((a, b) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	}

	getDiary(uuid: string) {
		return this.data.get(uuid);
	}

	getDiariesByDate(date: Dayjs) {
		this.checkInitialized();
		const targetDate = date.toDate();
		return Array.from(this.data.values()).filter((diary) => {
			const createdAt = new Date(diary.createdAt);
			return (
				createdAt.getFullYear() === targetDate.getFullYear() &&
				createdAt.getMonth() === targetDate.getMonth() &&
				createdAt.getDate() === targetDate.getDate() &&
				!diary.readonly
			);
		});
	}

	createDiary(): Diary {
		return {
			uuid: 'NOT_SAVED',
			shareUUID: null,
			sharedBy: null,
			sharedWith: [],
			emoji: '',
			title: '',
			content: '',
			attachments: [],
			encryptedData: null,
			aesKey: null,
			encryptedKey: null,
			nonce: null,
			readonly: false,
			isSharedViaURL: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}

	async addDiary(newDiary: DiaryEditable | Diary) {
		const uuid =
			'uuid' in newDiary && newDiary.uuid !== 'NOT_SAVED'
				? newDiary.uuid
				: v4();
		const diary: Diary = {
			...this.createDiary(),
			...newDiary,
			uuid,
		};
		this.data.set(uuid, diary);
		await this.saveData();
		return diary;
	}

	async updateDiary(uuid: string, updatedData: Diary | DiaryEditable) {
		this.checkInitialized();
		const diary = this.data.get(uuid);
		if (!diary) {
			throw new Error('Diary not found');
		}
		const updatedDiary: Diary = {
			...diary,
			...updatedData,
			updatedAt: new Date(),
		};
		this.data.set(uuid, updatedDiary);
		await this.saveData();

		if (diary.shareUUID && diary.aesKey) {
			const [encryptedData, _, nonce] = await encryptData(
				updatedDiary,
				diary.aesKey,
			);

			updatedDiary.encryptedData = encryptedData;
			updatedDiary.nonce = nonce;

			await apiClient.put(`/diaries/${diary.shareUUID}`, {
				data: encryptedData,
				nonce,
			});
		}

		return updatedDiary;
	}

	async shareDiary(
		uuid: string,
		targetUsers: Array<User>,
		preventDelete = false,
	) {
		this.checkInitialized();
		const diary = this.data.get(uuid);
		if (!diary) {
			throw new Error('Diary not found');
		}

		if (diary.shareUUID) {
			if (targetUsers.length === 0 && !preventDelete) {
				await apiClient.delete(`/diaries/${diary.shareUUID}`);

				diary.shareUUID = null;
				diary.encryptedData = null;
				diary.aesKey = null;
				diary.nonce = null;
				diary.sharedWith = [];
			} else {
				const removedUsers = diary.sharedWith.filter(
					(uuid) => !targetUsers.some((user) => user.uuid === uuid),
				);
				await Promise.all(
					removedUsers.map((uuid) =>
						apiClient.delete(
							`/diaries/shared/${diary.shareUUID}/users/${uuid}`,
						),
					),
				);
				diary.sharedWith = diary.sharedWith.filter(
					(uuid) => !removedUsers.includes(uuid),
				);
			}
		} else {
			const [encryptedData, aesKey, nonce] = await encryptData(diary);

			diary.encryptedData = encryptedData;
			diary.aesKey = aesKey;
			diary.nonce = nonce;
			diary.sharedWith = targetUsers.map((user) => user.uuid);

			const targets = await Promise.all(
				targetUsers.map(async (user) => {
					friendManager.addFriend(user);
					return {
						uuid: user.uuid,
						encryptedKey: await encryptKeyForRecipient(user.publicKey, aesKey),
					};
				}),
			);

			const res = await apiClient.post<ShareDiaryResponse>('/diaries', {
				data: encryptedData,
				nonce,
				targets,
			});

			diary.shareUUID = res.uuid;
		}

		diary.updatedAt = new Date();

		this.data.set(uuid, diary);
		await this.saveData();

		return diary;
	}

	async shareDiaryViaURL(uuid: string) {
		this.checkInitialized();
		const diary = this.data.get(uuid);
		if (!diary) {
			throw new Error('Diary not found');
		}

		let shareUUID = diary.shareUUID;
		let aesKey = diary.aesKey;
		if (!shareUUID || !aesKey) {
			const sharedDiary = await this.shareDiary(uuid, [], true);
			shareUUID = sharedDiary.shareUUID;
			aesKey = sharedDiary.aesKey;
		}

		if (!shareUUID || !aesKey) {
			throw new Error('Diary is not shared or missing encryption key');
		}

		diary.isSharedViaURL = true;
		diary.shareUUID = shareUUID;
		diary.aesKey = aesKey;
		diary.updatedAt = new Date();

		this.data.set(uuid, diary);
		await this.saveData();

		const baseUrl = import.meta.env.PROD
			? 'https://sotto-viewer.tyeongk.im'
			: 'http://localhost:5173';

		return {
			url: `${baseUrl}?uuid=${shareUUID}&key=${encodeURIComponent(aesKey)}`,
			diary,
		};
	}

	async stopURLSharingAndReEncrypt(uuid: string) {
		this.checkInitialized();
		const diary = this.data.get(uuid);
		if (!diary) {
			throw new Error('Diary not found');
		}

		if (!diary.isSharedViaURL) {
			throw new Error('Diary is not shared via URL');
		}

		await apiClient.delete(`/diaries/${diary.shareUUID}`);

		const [encryptedData, aesKey, nonce] = await encryptData(diary);

		diary.encryptedData = encryptedData;
		diary.aesKey = aesKey;
		diary.nonce = nonce;

		const targets = await Promise.all(
			diary.sharedWith.map(async (uuid) => {
				const user = friendManager.getFriend(uuid);
				if (!user) {
					return null;
				}
				return {
					uuid: user.uuid,
					encryptedKey: await encryptKeyForRecipient(user.publicKey, aesKey),
				};
			}),
		).then((targets) => targets.filter((target) => target !== null));

		const res = await apiClient.post<ShareDiaryResponse>('/diaries', {
			data: encryptedData,
			nonce,
			targets,
		});

		diary.shareUUID = res.uuid;
		diary.isSharedViaURL = false;
		diary.updatedAt = new Date();

		this.data.set(uuid, diary);
		await this.saveData();
		return diary;
	}

	isSharedDiary(diary: Diary) {
		return diary.shareUUID !== null;
	}

	async removeDiary(uuid: string) {
		this.checkInitialized();
		const diary = this.data.get(uuid);
		if (!diary) {
			throw new Error('Diary not found');
		}

		if (!diary.sharedBy && diary.shareUUID) {
			await apiClient.delete(`/diaries/${diary.shareUUID}`);
		}

		if (diary.attachments.length > 0 && !diary.readonly) {
			for (const attachment of diary.attachments) {
				await fileStorage.deleteFile(attachment.localId);
			}
		}

		this.data.delete(uuid);
		this.saveData();
		return diary;
	}

	async clear() {
		this.data.clear();
		this.isInitialized = false;
	}
}

export const diaryManager = new DiaryManager();
