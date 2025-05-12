import './styles/provider.css';
import type { BaseProps, HAS_CHILDREN } from '@/types/props';
import { useCallback, useState } from 'react';
import { DrawerContext } from './context';

interface DrawerProviderProps extends BaseProps<HAS_CHILDREN> {}

export function DrawerProvider(props: DrawerProviderProps) {
	const { children } = props;

	const [currentDrawer, setCurrentDrawer] = useState<string | null>(null);

	const openDrawer = useCallback((id: string) => {
		setCurrentDrawer(id);
	}, []);

	const closeDrawer = useCallback(() => {
		setCurrentDrawer(null);
	}, []);

	return (
		<DrawerContext
			value={{
				currentDrawer,
				openDrawer,
				closeDrawer,
			}}
		>
			{children}
		</DrawerContext>
	);
}
