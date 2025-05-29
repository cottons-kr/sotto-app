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
import { useFlow } from '@/hooks/use-flow';
import { resizeImage } from '@/lib/common';
import { message } from '@tauri-apps/plugin-dialog';
import { useCallback, useContext } from 'react';
import { SignUpFlowContext } from './context';
import { fillHeight, title } from './styles/styles.css';

export function SignUpInformationSection() {
	const { next } = useFlow();
	const { name, username, setProfileImage, setName, setUsername } =
		useContext(SignUpFlowContext);

	const onChangeProfileImage = useCallback(
		async (image: File | null) => {
			if (image) {
				setProfileImage(await resizeImage(image, 128));
			} else {
				setProfileImage(null);
			}
		},
		[setProfileImage],
	);

	const onClickSignUp = useCallback(async () => {
		if (!name) {
			await message('Please enter your name.', { kind: 'error' });
			return;
		}
		if (name.length < 1 || name.length > 50) {
			await message('Name must be between 1 and 50 characters long.', {
				kind: 'error',
			});
			return;
		}
		if (!/^[a-zA-Z\s]+$/.test(name)) {
			await message('Name can only contain letters and spaces.', {
				kind: 'error',
			});
			return;
		}

		if (!username) {
			await message('Please enter your username.', { kind: 'error' });
			return;
		}
		if (username.length < 6 || username.length > 24) {
			await message('Username must be between 6 and 24 characters long.', {
				kind: 'error',
			});
			return;
		}
		if (!/^[a-zA-Z0-9.]+$/.test(username)) {
			await message('Username must contain only letters, numbers, and dots.', {
				kind: 'error',
			});
			return;
		}

		next();
	}, [name, username, next]);

	return (
		<Column className={fillHeight}>
			<TopNavigator leadingArea={<GoBack />} />
			<Column className={fillHeight}>
				<Container className={title}>
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
