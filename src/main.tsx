import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './app/context/AuthContext.tsx';
import { AuthModalProvider } from './app/context/AuthModalContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<AuthModalProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthModalProvider>
		</AuthProvider>
	</StrictMode>,
);
