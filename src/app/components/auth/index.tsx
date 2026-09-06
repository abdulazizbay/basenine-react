import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAuthModal } from '../../hooks/useAuthModal';
import MemberService from '../../services/MemberService';
import Brand from '../ui/Brand';

const inputClassName =
	'w-full rounded-lg border border-bn-border bg-white/[0.025] px-3.5 py-3 text-sm text-bn-white outline-none transition-colors placeholder:text-bn-muted focus:border-bn-red';

export default function AuthModal() {
	const { setAuthMember } = useAuth();
	const { mode, openLogin, openSignup, close } = useAuthModal();
	const memberService = new MemberService();

	const [memberNick, setMemberNick] = useState('');
	const [memberPhone, setMemberPhone] = useState('');
	const [memberPassword, setMemberPassword] = useState('');

	useEffect(() => {
		if (!mode) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [mode, close]);

	if (!mode) return null;
	const isSignup = mode === 'signup';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const member = isSignup
				? await memberService.signup({
						memberNick,
						memberPhone,
						memberPassword,
					})
				: await memberService.login({
						memberNick,
						memberPassword,
					});

			if (member) {
				setAuthMember(member);
				close();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			onClick={close}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative grid w-full max-w-[900px] overflow-hidden rounded-2xl border border-white/10 bg-bn-surface shadow-2xl sm:grid-cols-[43%_57%]"
			>
				<button
					onClick={close}
					aria-label="Close"
					className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-lg leading-none text-white/60 transition-all hover:rotate-90 hover:bg-white/10 hover:text-white"
				>
					&times;
				</button>

				{/* Left visual panel */}
				<div className="relative hidden overflow-hidden border-r border-white/5 bg-bn-bg p-10 sm:flex sm:flex-col">
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								'radial-gradient(circle at 75% 35%, rgba(229,72,77,0.25), transparent 38%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.035), transparent 35%)',
						}}
					/>
					<span className="pointer-events-none absolute -bottom-6 right-5 select-none font-display text-[130px] font-extrabold leading-none text-white/[0.025]">
						09
					</span>

					<div className="relative z-10">
						<Brand />
					</div>

					<div className="relative z-10 mb-2 mt-auto">
						<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bn-red">
							{isSignup ? 'Join the game' : 'Welcome back'}
						</p>
						<h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-bn-white">
							{isSignup ? (
								<>
									Your baseball
									<br />
									journey starts
									<br />
									<span className="text-bn-red">here.</span>
								</>
							) : (
								<>
									Welcome back
									<br />
									to the
									<br />
									<span className="text-bn-red">game.</span>
								</>
							)}
						</h2>
						<p className="mt-4 max-w-[280px] text-xs leading-relaxed text-bn-muted">
							Follow teams, discover players, track games, and stay connected
							with BaseNine.
						</p>
					</div>
				</div>

				{/* Right form panel */}
				<div className="flex items-center justify-center bg-bn-surface px-8 py-12 sm:px-12">
					<form onSubmit={handleSubmit} className="w-full max-w-[330px]">
						<div className="mb-6 flex sm:hidden">
							<Brand />
						</div>

						<h3 className="font-display text-2xl font-bold text-bn-white">
							{isSignup ? 'Create your account' : 'Welcome back'}
						</h3>
						<p className="mt-2 text-[13px] text-bn-muted">
							{isSignup
								? 'Join BaseNine and follow the game.'
								: 'Sign in to continue to BaseNine.'}
						</p>

						<div className="mt-7 flex flex-col gap-3.5">
							<div>
								<label className="mb-1.5 block text-xs font-medium text-bn-muted">
									Username
								</label>
								<input
									value={memberNick}
									onChange={(e) => setMemberNick(e.target.value)}
									autoComplete="username"
									className={inputClassName}
								/>
							</div>

							{isSignup && (
								<div>
									<label className="mb-1.5 block text-xs font-medium text-bn-muted">
										Phone number
									</label>
									<input
										value={memberPhone}
										onChange={(e) => setMemberPhone(e.target.value)}
										autoComplete="tel"
										className={inputClassName}
									/>
								</div>
							)}

							<div>
								<label className="mb-1.5 block text-xs font-medium text-bn-muted">
									Password
								</label>
								<input
									type="password"
									value={memberPassword}
									onChange={(e) => setMemberPassword(e.target.value)}
									autoComplete={isSignup ? 'new-password' : 'current-password'}
									className={inputClassName}
								/>
							</div>
						</div>

						<button
							type="submit"
							className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-bn-red text-sm font-semibold text-white shadow-[0_12px_30px_rgba(229,72,77,0.2)] transition-all hover:-translate-y-0.5 hover:bg-bn-red-light"
						>
							{isSignup ? 'Create account' : 'Login'}
						</button>

						<div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-bn-muted">
							<span>
								{isSignup
									? 'Already have an account?'
									: "Don't have an account?"}
							</span>
							<button
								type="button"
								onClick={isSignup ? openLogin : openSignup}
								className="font-semibold text-bn-red transition-colors hover:text-bn-red-light"
							>
								{isSignup ? 'Login' : 'Sign up'}
							</button>
						</div>

						<div className="mt-7 flex items-center justify-center gap-1.5 text-[10px] text-bn-muted/70">
							<span className="h-1.5 w-1.5 rounded-full bg-bn-red shadow-[0_0_8px_rgba(229,72,77,0.6)]" />
							Secure BaseNine account
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
