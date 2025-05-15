export interface Diary {
	title: string;
	content: string;
	registeredUUID: string | null;
	sharedWith: Array<string>;
	createdAt: Date;
	updatedAt: Date;
}

class DiaryManager {
	async getDiaries() {
		return [];
	}

	async getSharedDiaries() {}

	async addDiary() {}

	async updateDiary() {}

	async shareDiary() {}
}

export const diaryManager = new DiaryManager();
