interface Diary {
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

interface Reply extends ReplyData {
	uuid: string;
	diaryId: string;
	authorId: string;
	createdAt: Date;
}
