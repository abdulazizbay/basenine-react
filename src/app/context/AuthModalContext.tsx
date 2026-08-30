import { createContext, useState, type ReactNode } from 'react';

type AuthModalMode = 'login' | 'signup' | null;
interface AuthModalContextValue {
	mode: AuthModalMode;
	openLogin: () => void;
	openSignup: () => void;
	close: () => void;
}

export const AuthModalContext = createContext<
	AuthModalContextValue | undefined
>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<AuthModalMode>(null);
	return (
		<AuthModalContext.Provider
			value={{
				mode,
				openLogin: () => setMode('login'),
				openSignup: () => setMode('signup'),
				close: () => setMode(null),
			}}
		>
			{children}
		</AuthModalContext.Provider>
	);
}
