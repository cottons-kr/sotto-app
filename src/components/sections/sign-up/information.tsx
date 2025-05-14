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
import { useCallback, useContext } from 'react';
import { SignUpFlowContext } from './context';
import { content, page } from './styles/information.css';

export function SignUpInformationSection() {
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
		if (!username) {
			await message('Please enter your username.', { kind: 'error' });
			return;
		}
	}, [name, username]);

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
