import type { InputHTMLAttributes } from 'react';
import { input } from './styles.css';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return <input {...props} className={input} />;
}
