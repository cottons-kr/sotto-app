interface SignUpResponse {
	accessToken: string;
	user: {
		name: string;
	};
}

interface ShareDiaryResponse {
	uuid: string;
}

type SharedDiariesResponse = Array<{
	uuid: string;
	diaryId: string;
	encryptedKey: string;
	diary: {
		uuid: string;
		data: string;
		nonce: string;
		owner: {
			uuid: string;
			username: string;
			name: string;
			profileUrl: string;
			publicKey: string;
		};
		createdAt: string;
		updatedAt: string;
	};
	recipient: unknown;
	createdAt: string;
}>;
