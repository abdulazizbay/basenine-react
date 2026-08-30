import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAuthModal } from '../../hooks/useAuthModal';
import MemberService from '../../services/MemberService';

export default function AuthModal() {
	const { setAuthMember } = useAuth();
	const { mode, close } = useAuthModal();
	const memberService = new MemberService();

	const [memberNick, setMemberNick] = useState('');
	const [memberPhone, setMemberPhone] = useState('');
	const [memberPassword, setMemberPassword] = useState('');

	if (!mode) return null;
	const isSignup = mode === 'signup';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('handleSubmit');

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
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>{isSignup ? 'Sign up' : 'Login'}</h2>

			<input
				placeholder="Nickname"
				value={memberNick}
				onChange={(e) => setMemberNick(e.target.value)}
			/>

			{isSignup && (
				<input
					placeholder="Phone"
					value={memberPhone}
					onChange={(e) => setMemberPhone(e.target.value)}
				/>
			)}

			<input
				type="password"
				placeholder="Password"
				value={memberPassword}
				onChange={(e) => setMemberPassword(e.target.value)}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
