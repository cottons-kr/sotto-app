import '@/styles/reset.css';
import '@/styles/font.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { diaryManager } from './lib/managers/diary';
import { storageClient } from './lib/managers/storage';
import DiaryPage from './routes/diary';
import HomePage from './routes/home';
import IndexPage from './routes/index';
import SignInBiometricPage from './routes/sign-in/biometric';
import SignInPinPage from './routes/sign-in/pin';
import SignUpPage from './routes/sign-up';
import SignInForgotPinPage from './routes/sign-in/forgot-pin';

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
			</Routes>
		</BrowserRouter>
	);
}
