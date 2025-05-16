import '@/styles/reset.css';
import '@/styles/font.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { diaryManager } from './lib/managers/diary';
import { storageClient } from './lib/managers/storage';
import HomePage from './routes/home';
import IndexPage from './routes/index';
import NewDiaryPage from './routes/new-diary';
import SignInBiometricPage from './routes/sign-in/biometric';
import SignInPinPage from './routes/sign-in/pin';
import SignUpPage from './routes/sign-up';

export default function App() {
	useEffect(() => {
		if (
			location.pathname !== '/' &&
			(!storageClient.isInitialized || !diaryManager.isInitialized)
		) {
			location.href = '/';
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/sign-in/biometric' element={<SignInBiometricPage />} />
				<Route path='/sign-in/pin' element={<SignInPinPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/new-diary' element={<NewDiaryPage />} />
			</Routes>
		</BrowserRouter>
	);
}
