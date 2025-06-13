export { default as cn } from 'classnames';

export async function resizeImage(image: File, size = 256) {
	const reader = new FileReader();
	const imageUrl = await new Promise<string>((resolve) => {
		reader.onloadend = () => {
			resolve(reader.result?.toString() ?? '');
		};
		reader.readAsDataURL(image);
	});

	const img = new Image();
	const resizedImageUrl = await new Promise<string>((resolve) => {
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(img, 0, 0, size, size);
				resolve(canvas.toDataURL());
			}
		};
		img.src = imageUrl;
	});

	return resizedImageUrl;
}

export async function wait(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export function calculateDiffDays(createdAt: Date) {
	const now = new Date();
	const diff = Math.abs(now.getTime() - createdAt.getTime());
	const diffDays = Math.floor(diff / (1000 * 3600 * 24));

	return diffDays;
}

export function convertFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = (error) => {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
}

export function bytesToSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
}
