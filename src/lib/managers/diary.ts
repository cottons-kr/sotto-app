import { v4 } from 'uuid';
import { storageClient } from './storage';

export interface Diary {
	uuid: string;
	shareUUID: string | null;
	emoji: string;
	title: string;
	content: string;
	sharedWith: Array<string>;
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

	async getDiaries() {
		return Array.from(this.data.values());
	}

	async getSharedDiaries() {
		return [] as Array<Diary>;
	}

	async addDiary(newDiary: DiaryEditable) {
		const uuid = v4();
		const diary: Diary = {
			...newDiary,
			uuid,
			shareUUID: null,
			sharedWith: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.data.set(uuid, diary);
		await this.saveData();
		return this.data.get(uuid);
	}

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

	async shareDiary(uuid: string) {}
}

export const diaryManager = new DiaryManager();
