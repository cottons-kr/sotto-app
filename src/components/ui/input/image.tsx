import { Plus } from 'lucide-react';
import {
	type ChangeEvent,
	type InputHTMLAttributes,
	useCallback,
	useState,
} from 'react';
import { image, input, wrapper } from './styles/image.css';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
	preview?: string;
	onImage?: (image: File | null) => void;
}

export function ImageInput(props: ImageInputProps) {
	const { preview, onChange: propOnChange, onImage, ...rest } = props;
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(preview);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreviewUrl(reader.result?.toString());
				};
				reader.readAsDataURL(file);
				onImage?.(file);
			}
			propOnChange?.(e);
		},
		[propOnChange, onImage],
	);

	return (
		<label className={wrapper}>
			{previewUrl ? (
				<img className={image} src={previewUrl} alt='Preview' />
			) : (
				<Plus size={32} />
			)}
			<input {...rest} className={input} type='file' onChange={onChange} />
		</label>
	);
}
