import { Container } from '@/components/layout/container';
import { useDrawer } from '@/hooks/use-drawer';
import { cn } from '@/lib/common';
import emojis from 'emojibase-data/en/data.json';
import { useState } from 'react';
import { Button } from '../button';
import { ButtonGroup } from '../button/group';
import { Drawer } from '../drawer';
import { Typo } from '../typography';
import {
	emojiButton,
	emojiContainer,
	emojiGrid,
	placeholderStyle,
} from './styles/emoji.css';

interface EmojiInputProps {
	placeholder?: string;
	defaultValue?: string;
	onValue?: (value: string) => unknown;
	disabled?: boolean;
}

export function EmojiInput(props: EmojiInputProps) {
	const { placeholder = '😀', defaultValue, onValue, disabled } = props;

	const [value, setValue] = useState<string | undefined>(defaultValue);
	const { toggleDrawer } = useDrawer('emoji-selector');

	return (
		<>
			<div
				className={cn(!value && placeholderStyle)}
				onClick={disabled ? undefined : toggleDrawer}
			>
				<Typo.Title>{value || placeholder}</Typo.Title>
			</div>
			<Drawer id='emoji-selector'>
				<Container vertical='small' horizontal='large'>
					<Typo.Lead weight='strong'>How about your feeling?</Typo.Lead>
				</Container>
				<Container className={emojiContainer} vertical='small'>
					<div className={emojiGrid}>
						{emojis
							.filter((e) => e.group === 0)
							.map((emoji) => (
								<button
									key={emoji.label}
									className={emojiButton}
									type='button'
									onClick={() => {
										setValue(emoji.emoji);
										onValue?.(emoji.emoji);
										toggleDrawer();
									}}
								>
									<Typo.Title>{emoji.emoji}</Typo.Title>
								</button>
							))}
					</div>
				</Container>
				<ButtonGroup>
					<Button fill>Select</Button>
				</ButtonGroup>
			</Drawer>
		</>
	);
}
