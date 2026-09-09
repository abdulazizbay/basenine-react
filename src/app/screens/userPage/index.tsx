import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import MemberService from '../../services/MemberService';
import type { Member } from '../../../lib/types/member';
import { useAuth } from '../../hooks/useAuth';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Settings from './Settings';
import RecentlyViewed from './RecentlyViewed';
import SubscribedTeams from './SubscribedTeams';
import ProfileSidebar, { type ProfileView } from './ProfileSidebar';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../lib/utils/error';

export default function UserPage() {
	const { authMember, setAuthMember } = useAuth();
	const [memberDetail, setMemberDetail] = useState<Member | null>(null);
	const [activeView, setActiveView] = useState<ProfileView>('settings');

	useEffect(() => {
		if (!authMember) return;
		const fetchMemberDetail = async () => {
			try {
				const memberService = new MemberService();
				const member = await memberService.getMemberDetail();
				setMemberDetail(member);
			} catch (err) {
				toast.error(getErrorMessage(err, 'Could not load your profile.'));
			}
		};
		fetchMemberDetail();
	}, [authMember]);

	if (!authMember) return <Navigate to="/" replace />;
	if (!memberDetail) return null;

	const handleMemberUpdated = (updated: Member) => {
		setMemberDetail((prev) => (prev ? { ...prev, ...updated } : prev));
	};

	const handleLogout = async () => {
		const memberService = new MemberService();
		await memberService.logout();
		setAuthMember(null);
	};

	return (
		<div className="pb-16 pt-32 sm:pt-40">
			<Container>
				<SectionHeader eyebrow="Account" title="My Page" />
				<div className="flex flex-col gap-6 lg:flex-row">
					<ProfileSidebar
						memberDetail={memberDetail}
						activeView={activeView}
						onViewChange={setActiveView}
						onLogout={handleLogout}
					/>

					<div className="min-w-0 flex-1">
						{activeView === 'recently-viewed' && <RecentlyViewed />}

						{activeView === 'subscribed-teams' && <SubscribedTeams />}

						{activeView === 'settings' && (
							<div>
								<SectionHeader eyebrow="Account" title="Profile settings" />
								<Settings memberDetail={memberDetail} onUpdated={handleMemberUpdated} />
							</div>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
}
