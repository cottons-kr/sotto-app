import { Avatar } from '@/components/ui/avatar';
import { resizeImage } from '@/lib/common';
import { log } from '@/lib/log';
import { apiClient } from '@/lib/managers/http';
import { color } from '@/styles/color.css';
import { message } from '@tauri-apps/plugin-dialog';
import { Pencil } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import { avatar } from '../diary/styles/share.css';
import { edit } from './styles/image.css';

export function MyProfileImage() {
	const [profileImage, setProfileImage] = useState<string | null>(
		localStorage.getItem('profileImage'),
	);

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}

		const image = await resizeImage(file, 128);
		const prevImage = localStorage.getItem('profileImage');

		try {
			await apiClient.patch('/users/me', {
				profileUrl: image,
			});
			localStorage.setItem('profileImage', image);
			setProfileImage(image);
		} catch (error) {
			await message('Failed to update profile image.');
			log('error', 'Failed to update profile image', error);
			if (prevImage) {
				localStorage.setItem('profileImage', prevImage);
				setProfileImage(prevImage);
			}
		}
	};

	return (
		<label className={avatar}>
			<Avatar size={72} src={profileImage} />
			<div className={edit}>
				<Pencil size={12} color={color.milk} />
			</div>
			<input type='file' accept='image/*' hidden onChange={onChange} />
		</label>
	);
}
