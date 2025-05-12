import { useContext } from 'react';
import { DrawerContext } from './context';

export function useDrawer(id: string) {
	const { currentDrawer, openDrawer, closeDrawer } = useContext(DrawerContext);
	const isOpen = currentDrawer === id;

	const toggleDrawer = () => {
		if (isOpen) {
			closeDrawer();
		} else {
			openDrawer(id);
		}
	};

	return {
		isOpen,
		openDrawer,
		closeDrawer,
		toggleDrawer,
	};
}
