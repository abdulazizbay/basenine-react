import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from './navLinks';
import { useAuthModal } from '../../hooks/useAuthModal';
import { useAuth } from '../../hooks/useAuth';
import MemberService from '../../services/MemberService';

const linkClassName = ({ isActive }: { isActive: boolean }) =>
	`text-sm font-medium transition-colors ${
		isActive ? 'text-bn-white' : 'text-bn-muted hover:text-bn-white'
	}`;

export default function OtherNavbar() {
	const { openLogin, openSignup } = useAuthModal();
	const { authMember, setAuthMember } = useAuth();
	const memberService = new MemberService();

	const handleLogout = async () => {
		await memberService.logout();
		setAuthMember(null);
	};
	return (
		<header className="absolute inset-x-0 top-0 z-20">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
				<span className="font-display text-lg font-bold text-bn-white">
					basenine
				</span>
				<nav className="flex items-center gap-6">
					{NAV_LINKS.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.to === '/'}
							className={linkClassName}
						>
							{link.label}
						</NavLink>
					))}
				</nav>
				{authMember ? (
					<div>
						<div>{authMember.memberNick}</div>
						<div onClick={handleLogout}>Logout</div>
					</div>
				) : (
					<div onClick={openLogin}>Login</div>
				)}
			</div>
			<div onClick={openSignup}>Sign up</div>
		</header>
	);
}
