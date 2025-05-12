import '@/styles/reset.css';
import '@/styles/font.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthSignInPage from './routes/auth/sign-in';
import AuthSignUpPage from './routes/auth/sign-up';
import HomePage from './routes/home';
import IndexPage from './routes/index';
import NewDiaryPage from './routes/new-diary';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/auth/sign-up' element={<AuthSignUpPage />} />
				<Route path='/auth/sign-in' element={<AuthSignInPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/new-diary' element={<NewDiaryPage />} />
			</Routes>
		</BrowserRouter>
	);
}
