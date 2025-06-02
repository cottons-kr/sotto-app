export interface AuthPopupProps {
	close: () => void;
	openAlternative: () => void;
	callback: () => unknown;
}
