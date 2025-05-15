import ReactDOM from 'react-dom/client';
import App from './App';
import { DrawerProvider } from './components/ui/drawer/provider';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
	<DrawerProvider>
		<App />
	</DrawerProvider>,
);
