import '@/styles/reset.css';
import '@/styles/font.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/home';
import IndexPage from './routes/index';
import NewDiaryPage from './routes/new-diary';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/auth/sign-up' element={<h1>Auth Sign up</h1>} />
				<Route path='/auth/sign-in' element={<h1>Auth Sign in</h1>} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/new-diary' element={<NewDiaryPage />} />
			</Routes>
		</BrowserRouter>
	);
}
