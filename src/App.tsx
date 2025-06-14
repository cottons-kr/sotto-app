import '@/styles/reset.css';
import '@/styles/font.css';
import { Suspense, createContext, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OverlayProvider } from './components/ui/overlay/provider';
import { useCheckInitialized } from './hooks/use-check-initialized';
import {
	DiaryPage,
	ExplorerDiariesDetailPage,
	ExplorerDiariesPage,
	ExplorerFriendsDetailPage,
	ExplorerFriendsPage,
	HomePage,
	IndexPage,
	MyProfilePage,
	SignInBiometricPage,
	SignInForgotPinPage,
	SignInPinPage,
	SignUpPage,
} from './routes';
import ExplorerLocationAliasPage from './routes/explorer/location-alias';

export const AppContext = createContext({} as { forceUpdate: () => unknown });

export default function App() {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	useCheckInitialized();

	return (
		<AppContext value={{ forceUpdate }}>
			<BrowserRouter>
				<OverlayProvider>
					<Suspense>
						<Routes>
							<Route path='/' element={<IndexPage />} />
							<Route path='/sign-up' element={<SignUpPage />} />
							<Route
								path='/sign-in/biometric'
								element={<SignInBiometricPage />}
							/>
							<Route path='/sign-in/pin' element={<SignInPinPage />} />
							<Route
								path='/sign-in/forgot-pin'
								element={<SignInForgotPinPage />}
							/>
							<Route path='/home' element={<HomePage />} />
							<Route path='/diary' element={<DiaryPage />} />
							<Route path='/my-profile' element={<MyProfilePage />} />
							<Route
								path='/explorer/diaries'
								element={<ExplorerDiariesPage />}
							/>
							<Route
								path='/explorer/diaries/:uuid'
								element={<ExplorerDiariesDetailPage />}
							/>
							<Route
								path='/explorer/friends'
								element={<ExplorerFriendsPage />}
							/>
							<Route
								path='/explorer/friends/:uuid'
								element={<ExplorerFriendsDetailPage />}
							/>
							<Route
								path='/explorer/location-alias'
								element={<ExplorerLocationAliasPage />}
							/>
						</Routes>
					</Suspense>
				</OverlayProvider>
			</BrowserRouter>
		</AppContext>
	);
}
