import '@/styles/reset.css';
import '@/styles/font.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { diaryManager } from './lib/managers/diary';
import { storageClient } from './lib/managers/storage';
import SignInBiometricPage from './routes/auth/sign-in/biometric';
import SignInForgotPinPage from './routes/auth/sign-in/forgot-pin';
import SignInPinPage from './routes/auth/sign-in/pin';
import SignUpPage from './routes/auth/sign-up';
import DiaryPage from './routes/diary';
import HomePage from './routes/home';
import IndexPage from './routes/index';
import MyProfilePage from './routes/my-profile';

export default function App() {
	useEffect(() => {
		if (
			location.pathname !== '/' &&
			(!storageClient.isInitialized || !diaryManager.isInitialized)
		) {
			location.href = `/?redirect=${location.pathname}`;
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/sign-in/biometric' element={<SignInBiometricPage />} />
				<Route path='/sign-in/pin' element={<SignInPinPage />} />
				<Route path='/sign-in/forgot-pin' element={<SignInForgotPinPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/diary' element={<DiaryPage />} />
				<Route path='/my-profile' element={<MyProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}
