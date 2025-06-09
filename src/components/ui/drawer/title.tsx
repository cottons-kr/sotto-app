import { Container } from '@/components/layout/container';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { Typo } from '../typography';

interface DrawerTitleProps extends BaseProps<HAS_CHILDREN> {}

export function DrawerTitle(props: DrawerTitleProps) {
	const { children } = props;

	return (
		<Container vertical='small' horizontal='large'>
			<Typo.Lead weight='strong'>{children}</Typo.Lead>
		</Container>
	);
}
