import { cn } from '@/utils/common';
import { TypographyBase, type TypographyBaseProps } from './base';
import { body, caption, lead, title } from './styles/typography.css';

function typographyBuilder(...classNames: Array<string>) {
	return (props: TypographyBaseProps) => (
		<TypographyBase {...props} className={cn(classNames, props.className)} />
	);
}

const Typography = {
	Title: typographyBuilder(title),
	Lead: typographyBuilder(lead),
	Body: typographyBuilder(body),
	Caption: typographyBuilder(caption),
};

export { Typography, Typography as Typo };
