import { createContext, useState, type ReactNode } from 'react';
import type { Member } from '../../lib/types/member';
import Cookies from 'universal-cookie';

interface AuthContextValue {
	authMember: Member | null;
	setAuthMember: (member: Member | null) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
	undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const cookies = new Cookies();
	if (!cookies.get('accessToken')) localStorage.removeItem('memberData');
	const [authMember, setAuthMember] = useState<Member | null>(
		localStorage.getItem('memberData')
			? JSON.parse(localStorage.getItem('memberData') as string)
			: null,
	);

	return (
		<AuthContext.Provider value={{ authMember, setAuthMember }}>
			{children}
		</AuthContext.Provider>
	);
}
