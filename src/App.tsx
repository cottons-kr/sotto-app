import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/home';
import NewDiaryPage from './routes/new-diary';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/new-diary' element={<NewDiaryPage />} />
			</Routes>
		</BrowserRouter>
	);
}
