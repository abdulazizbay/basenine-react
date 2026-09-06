import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from './navLinks';
import { useAuthModal } from '../../hooks/useAuthModal';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useClickOutside } from '../../hooks/useClickOutside';
import MemberService from '../../services/MemberService';
import { serverApi } from '../../../lib/config';
import Brand from '../ui/Brand';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';
import CartIcon from './BasketIcon';
import Basket from './Basket';

const linkClassName = ({ isActive }: { isActive: boolean }) =>
	`text-sm font-medium transition-colors ${
		isActive ? 'text-bn-white' : 'text-bn-muted hover:text-bn-white'
	}`;

export default function HomeNavbar() {
	const { openLogin } = useAuthModal();
	const { authMember, setAuthMember } = useAuth();
	const { cartItems } = useCart();
	const [basketOpen, setBasketOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const basketRef = useRef<HTMLDivElement>(null);
	useClickOutside(basketRef, () => setBasketOpen(false), basketOpen);
	const menuRef = useRef<HTMLDivElement>(null);
	useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

	const handleLogout = async () => {
		const memberService = new MemberService();
		await memberService.logout();
		setAuthMember(null);
	};

	return (
		<header className="absolute inset-x-0 top-0 z-20 border-b border-white/5">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<NavLink to="/" className="shrink-0">
					<Brand />
				</NavLink>

				<nav className="hidden items-center gap-7 md:flex">
					{NAV_LINKS.filter((link) => !link.authOnly || authMember).map(
						(link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === '/'}
								className={linkClassName}
							>
								{link.label}
							</NavLink>
						),
					)}
				</nav>

				<div className="flex items-center gap-3">
					<div className="relative" ref={basketRef}>
						<button
							onClick={() => setBasketOpen((v) => !v)}
							aria-label="Cart"
							className="relative rounded-full p-2 text-bn-muted transition-colors hover:bg-white/5 hover:text-bn-white"
						>
							<CartIcon />
							{cartItems.length > 0 && (
								<span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bn-red text-[10px] font-semibold text-bn-white">
									{cartItems.length}
								</span>
							)}
						</button>
						{basketOpen && <Basket />}
					</div>

					{authMember ? (
						<div className="relative" ref={menuRef}>
							<button
								onClick={() => setMenuOpen((v) => !v)}
								aria-label="Account"
								className="block rounded-full"
							>
								<ImageWithFallback
									src={
										authMember.memberImage
											? `${serverApi}/${authMember.memberImage}`
											: null
									}
									alt={authMember.memberNick}
									className="h-9 w-9 rounded-full border-2 border-bn-border"
								/>
							</button>
							{menuOpen && (
								<Card className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden p-1.5">
									<button
										onClick={() => {
											setMenuOpen(false);
											handleLogout();
										}}
										className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium text-bn-red transition-colors hover:bg-white/5"
									>
										Logout
									</button>
								</Card>
							)}
						</div>
					) : (
						<button
							onClick={openLogin}
							className="rounded-full bg-bn-red px-4 py-2 text-sm font-semibold text-bn-white transition-colors hover:bg-bn-red-light"
						>
							Login
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
