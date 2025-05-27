import { NuqsAdapter } from 'nuqs/adapters/react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DrawerProvider } from './components/ui/drawer/provider';
import { OverlayProvider } from './components/ui/overlay/provider';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
	<Suspense>
		<NuqsAdapter>
			<OverlayProvider>
				<DrawerProvider>
					<App />
				</DrawerProvider>
			</OverlayProvider>
		</NuqsAdapter>
	</Suspense>,
);
