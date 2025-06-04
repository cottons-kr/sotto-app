import { lazy } from 'react';

export const SignInBiometricPage = lazy(
	() => import('./auth/sign-in/biometric'),
);
export const SignInForgotPinPage = lazy(
	() => import('./auth/sign-in/forgot-pin'),
);
export const SignInPinPage = lazy(() => import('./auth/sign-in/pin'));
export const SignUpPage = lazy(() => import('./auth/sign-up'));
export const DiaryPage = lazy(() => import('./diary'));
export const ExplorerDiariesPage = lazy(() => import('./explorer/diaries'));
export const ExplorerDiariesDetailPage = lazy(
	() => import('./explorer/diaries/detail'),
);
export const ExplorerFriendsPage = lazy(() => import('./explorer/friends'));
export const ExplorerFriendsDetailPage = lazy(
	() => import('./explorer/friends/detail'),
);
export const HomePage = lazy(() => import('./home'));
export const IndexPage = lazy(() => import('./index/index'));
export const MyProfilePage = lazy(() => import('./my-profile'));
