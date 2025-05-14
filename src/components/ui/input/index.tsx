import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { input } from './styles/text.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	onValue?: (value: string) => void;
}

export function Input(props: InputFieldProps) {
	const { onValue, onChange: propOnChange, ...rest } = props;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		propOnChange?.(e);
		onValue?.(e.target.value);
	};

	return <input {...rest} className={input} onChange={onChange} />;
}
