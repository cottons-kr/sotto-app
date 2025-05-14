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
