import { encryptDiary } from '@/binding/function/encrypt-diary';
import { encryptKeyForRecipient } from '@/binding/function/encrypt-key-for-recipient';
import { v4 } from 'uuid';
import { type User, friendManager } from './friend';
import { apiClient } from './http';
import { storageClient } from './storage';

export interface Diary {
	uuid: string;
	shareUUID: string | null;
	emoji: string;
	title: string;
	content: string;
	sharedWith: Array<string>;
	encryptedData: string | null;
	aesKey: string | null;
	nonce: string | null;
	createdAt: Date;
	updatedAt: Date;
}

interface DiaryEditable {
	emoji: string;
	title: string;
	content: string;
}

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

	private async saveData() {
		this.checkInitialized();
		await storageClient.set(
			'diaries',
			JSON.stringify(Object.fromEntries(this.data)),
		);
	}

	getDiaries() {
		return Array.from(this.data.values()).sort((a, b) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	}

	getDiary(uuid: string) {
		return this.data.get(uuid);
	}

	async getSharedDiaries() {
		return [] as Array<Diary>;
	}

	createDiary(): Diary {
		return {
			uuid: 'NOT_SAVED',
			shareUUID: null,
			sharedWith: [],
			emoji: '',
			title: '',
			content: '',
			encryptedData: null,
			aesKey: null,
			nonce: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}

	async addDiary(newDiary: DiaryEditable) {
		const uuid = v4();
		const diary: Diary = {
			...this.createDiary(),
			...newDiary,
			uuid,
		};
		this.data.set(uuid, diary);
		await this.saveData();
		return diary;
	}

	/**
	 * TODO: 만약 기존에 공유된 일기라면 nonce 재발급해서 다시 암호화 후 서버에 업데이트
	 */
	async updateDiary(uuid: string, updatedData: DiaryEditable) {
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
		return updatedDiary;
	}

	async shareDiary(uuid: string, targetUsers: Array<User>) {
		this.checkInitialized();
		const diary = this.data.get(uuid);
		if (!diary) {
			throw new Error('Diary not found');
		}

		if (diary.shareUUID) {
			console.log('Diary is already shared');
			if (targetUsers.length === 0) {
				console.log('Unsharing diary');
				await apiClient.delete(`/diaries/${diary.shareUUID}`);

				diary.shareUUID = null;
				diary.encryptedData = null;
				diary.aesKey = null;
				diary.nonce = null;
				diary.sharedWith = [];
			} else {
				console.log('Updating shared users');
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
			console.log('Sharing diary');
			const [encryptedData, aesKey, nonce] = await encryptDiary(diary);

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

	isSharedDiary(diary: Diary) {
		return diary.shareUUID !== null;
	}
}

export const diaryManager = new DiaryManager();
