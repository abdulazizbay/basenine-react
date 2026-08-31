import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from './navLinks';
import { useAuthModal } from '../../hooks/useAuthModal';
import { useAuth } from '../../hooks/useAuth';
import MemberService from '../../services/MemberService';
import CartIcon from './BasketIcon';
import Basket from './Basket';

const linkClassName = ({ isActive }: { isActive: boolean }) =>
	`text-sm font-medium transition-colors ${
		isActive ? 'text-bn-white' : 'text-bn-muted hover:text-bn-white'
	}`;

export default function OtherNavbar() {
	const { openLogin, openSignup } = useAuthModal();
	const { authMember, setAuthMember } = useAuth();
	const memberService = new MemberService();
	const [basketOpen, setBasketOpen] = useState(false);

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
				<div className="relative">
					<button
						onClick={() => setBasketOpen((v) => !v)}
						aria-label="Cart"
						className="relative rounded-full p-2 text-bn-muted transition-colors hover:text-bn-white"
					>
						<CartIcon />
						<span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bn-red text-[10px] font-semibold text-bn-white">
							2
						</span>
					</button>
					{basketOpen && <Basket onClose={() => setBasketOpen(false)} />}
				</div>
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
