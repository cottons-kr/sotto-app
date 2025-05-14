import { type Dispatch, type SetStateAction, createContext } from 'react';

type SignUpFlowContextType = {
	profileImage: string | null;
	name: string;
	username: string;
	pin: string;
	confirmPin: string;
	useBiometricLogin: boolean;
	setProfileImage: Dispatch<SetStateAction<string | null>>;
	setName: Dispatch<SetStateAction<string>>;
	setUsername: Dispatch<SetStateAction<string>>;
	setPin: Dispatch<SetStateAction<string>>;
	setConfirmPin: Dispatch<SetStateAction<string>>;
	setUseBiometricLogin: Dispatch<SetStateAction<boolean>>;
};

export const SignUpFlowContext = createContext({} as SignUpFlowContextType);
