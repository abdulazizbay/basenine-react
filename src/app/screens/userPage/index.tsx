import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import { useEffect, useState } from 'react';
import MemberService from '../../services/MemberService';
import type { Member } from '../../../lib/types/member';

export default function UsersPage() {
	const [memberDetail, setMemberDetail] = useState<Member | null>(null);
	useEffect(() => {
		const fetchMemberDetail = async () => {
			const memberService = new MemberService();
			const member = await memberService.getMemberDetail();
			setMemberDetail(member);
		};
		fetchMemberDetail();
	}, []);

	return (
		<Container className="py-16">
			<SectionHeader eyebrow="My account" title="Profile" />
			<EmptyState
				title="Sign in to view your profile"
				description="Account details and subscribed teams will appear here."
			/>
			{memberDetail?.memberNick}
		</Container>
	);
}
