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
import { message } from '@tauri-apps/plugin-dialog';
import { fetch } from '@tauri-apps/plugin-http';
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

		console.log('Profile Image:', profileImage);
		console.log('Name:', name);
		console.log('Username:', username);

		generateKeyPair()
			.then(async ({ publicKeyPem }) => {
				const res = await fetch('http://localhost:3000/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						username,
						profileUrl: profileImage,
						publicKey: publicKeyPem,
					}),
				});
				console.log('Response:', await res.json());
				if (!res.ok) {
					await message('Sign up failed. Please try again.', { kind: 'error' });
					return;
				}
				await message(`Sign up successful! Welcome ${name}`, { kind: 'info' });
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
