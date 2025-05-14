import { generateKeyPair } from '@/binding/function/generate-key-pair';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input/field';
import { ImageInput } from '@/components/ui/input/image';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { resizeImage } from '@/lib/common';
import { apiClient } from '@/lib/http';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useState } from 'react';
import { content, page } from './page.css';

export default function SignUpPage() {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [name, setName] = useState<string>('');
	const [username, setUsername] = useState<string>('');

	const onChangeProfileImage = useCallback(async (image: File | null) => {
		if (image) {
			setProfileImage(await resizeImage(image, 128));
		} else {
			setProfileImage(null);
		}
	}, []);

	const onClickSignUp = useCallback(async () => {
		if (!name) {
			await message('Please enter your name.', { kind: 'error' });
			return;
		}
		if (!username) {
			await message('Please enter your username.', { kind: 'error' });
			return;
		}

		generateKeyPair()
			.then(async ({ publicKeyPem }) => {
				try {
					const { accessToken, user } = await apiClient.post<SignUpResponse>(
						'/users',
						{
							name,
							username,
							profileUrl: profileImage,
							publicKey: publicKeyPem,
						},
					);
					await message(`Sign up successful! Welcome ${name}`);
				} catch (error) {
					await message('Sign up failed. Please try again.', { kind: 'error' });
				}
			})
			.catch((error) => {
				console.error('Error generating key pair:', error);
			});
	}, [profileImage, name, username]);

	return (
		<Column className={page}>
			<TopNavigator leadingArea={<GoBack />} />
			<Column className={content}>
				<Container>
					<Typo.Title weight='strong'>Sign up</Typo.Title>
				</Container>
				<InputField label='Profile Image'>
					<ImageInput onImage={onChangeProfileImage} />
				</InputField>
				<InputField label='Name'>
					<Input placeholder='Your full name' value={name} onValue={setName} />
				</InputField>
				<InputField label='Username'>
					<Input
						placeholder='Alphabet and number only'
						value={username}
						onValue={setUsername}
					/>
				</InputField>
			</Column>
			<ButtonGroup bottomSafeAreaPadding>
				<Button fill onClick={onClickSignUp}>
					Sign up
				</Button>
			</ButtonGroup>
		</Column>
	);
}
