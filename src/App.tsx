import '@/styles/reset.css';
import '@/styles/font.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useStorage } from './hooks/use-storage';
import HomePage from './routes/home';
import IndexPage from './routes/index';
import NewDiaryPage from './routes/new-diary';
import SignUpPage from './routes/sign-up';

export default function App() {
	useStorage();

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<IndexPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/new-diary' element={<NewDiaryPage />} />
			</Routes>
		</BrowserRouter>
	);
}
