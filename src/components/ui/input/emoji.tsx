import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { useDrawer } from '@/hooks/use-drawer';
import { cn } from '@/lib/common';
import emojis from 'emojibase-data/en/data.json';
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useState,
} from 'react';
import { Drawer } from '../drawer';
import type { OverlayProps } from '../overlay/types';
import { Typo } from '../typography';
import {
	emojiButton,
	emojiContainer,
	emojiGrid,
	input,
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
	const { show } = useDrawer(EmojiSelectorDrawer);

	const openShareDrawer = useCallback(() => {
		show({
			setValue,
			onValue,
		});
	}, [show, onValue]);

	return (
		<Row
			className={cn(input, !value && placeholderStyle)}
			align='center'
			justify='start'
			onClick={disabled ? undefined : openShareDrawer}
		>
			<Typo.Title>{value || placeholder}</Typo.Title>
		</Row>
	);
}

interface EmojiSelectorDrawerProps {
	onValue?: (value: string) => unknown;
	setValue: Dispatch<SetStateAction<string | undefined>>;
}

function EmojiSelectorDrawer(props: EmojiSelectorDrawerProps & OverlayProps) {
	const { onValue, setValue, close } = props;

	return (
		<Drawer close={close}>
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
									close();
								}}
							>
								<Typo.Title>{emoji.emoji}</Typo.Title>
							</button>
						))}
				</div>
			</Container>
		</Drawer>
	);
}
