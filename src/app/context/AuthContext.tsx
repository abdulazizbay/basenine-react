import { createContext, useState, type ReactNode } from 'react';
import type { Member } from '../../lib/types/member';

interface AuthContextValue {
	authMember: Member | null;
	setAuthMember: (member: Member | null) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [authMember, setAuthMember] = useState<Member | null>(null);
	return (
		<AuthContext.Provider value={{ authMember, setAuthMember }}>
			{children}
		</AuthContext.Provider>
	);
}
