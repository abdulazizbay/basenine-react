import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import Card from '../../components/ui/Card';
import ImageWithFallback from '../../components/ui/ImageWithFallback';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MemberService from '../../services/MemberService';
import type { Member } from '../../../lib/types/member';
import type { Favourite } from '../../../lib/types/favourite';
import { serverApi } from '../../../lib/config';
import { useAuth } from '../../hooks/useAuth';
import Settings from './Settings';

type MemberDetail = Member & { favourites: Favourite[] };

export default function UsersPage() {
	const { authMember } = useAuth();
	const [memberDetail, setMemberDetail] = useState<MemberDetail | null>(null);

	useEffect(() => {
		if (!authMember) return;
		const fetchMemberDetail = async () => {
			try {
				const memberService = new MemberService();
				const member = await memberService.getMemberDetail();
				setMemberDetail(member);
			} catch (err) {
				console.log(err);
			}
		};
		fetchMemberDetail();
	}, [authMember]);

	if (!authMember) return <Navigate to="/" replace />;
	if (!memberDetail) return null;

	const subscribedTeams = memberDetail.favourites
		.filter((fav) => fav.team && fav.team.length !== 0)
		.map((fav) => fav.team![0]);

	return (
		<div>
			<section className="bg-linear-to-b from-bn-surface to-bn-bg pb-16 pt-32 sm:pt-40">
				<Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
					<ImageWithFallback
						src={
							memberDetail.memberImage
								? `${serverApi}/${memberDetail.memberImage}`
								: null
						}
						alt={memberDetail.memberNick}
						className="h-28 w-28 shrink-0 rounded-full"
					/>

					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-bn-red">
							{memberDetail.memberType}
						</p>
						<h1 className="mt-2 font-display text-3xl font-bold text-bn-white sm:text-4xl">
							{memberDetail.memberNick}
						</h1>

						<div className="mt-6 flex justify-center gap-8 sm:justify-start">
							<div>
								<p className="font-display text-xl font-bold text-bn-white">
									{new Date(memberDetail.createdAt).toLocaleDateString(
										undefined,
										{ month: 'short', year: 'numeric' },
									)}
								</p>
								<p className="text-xs text-bn-muted">Member since</p>
							</div>
							<div className="border-l border-bn-border pl-8">
								<p className="font-display text-xl font-bold text-bn-white">
									{subscribedTeams.length}
								</p>
								<p className="text-xs text-bn-muted">Teams followed</p>
							</div>
							<div className="border-l border-bn-border pl-8">
								<p className="font-display text-xl font-bold text-bn-white">
									{memberDetail.memberStatus}
								</p>
								<p className="text-xs text-bn-muted">Status</p>
							</div>
						</div>
					</div>
				</Container>
			</section>

			<Container className="grid gap-8 py-12 lg:grid-cols-[1.6fr_1fr]">
				<div>
					<SectionHeader eyebrow="Account" title="Profile settings" />
					<Settings
						memberDetail={memberDetail}
						onUpdated={(updated) =>
							setMemberDetail((prev) => (prev ? { ...prev, ...updated } : prev))
						}
					/>
				</div>

				<div className="flex flex-col gap-8">
					<Card className="p-5">
						<SectionHeader eyebrow="Details" title="Account info" />
						<div className="flex flex-col gap-3 text-sm">
							<div className="flex items-center justify-between">
								<span className="text-bn-muted">Username</span>
								<span className="text-bn-white">{memberDetail.memberNick}</span>
							</div>
							<div className="flex items-center justify-between border-t border-bn-border pt-3">
								<span className="text-bn-muted">Phone</span>
								<span className="text-bn-white">{memberDetail.memberPhone}</span>
							</div>
							<div className="flex items-center justify-between border-t border-bn-border pt-3">
								<span className="text-bn-muted">Address</span>
								<span className="text-bn-white">
									{memberDetail.memberAddress ?? 'Not set'}
								</span>
							</div>
							<div className="flex items-center justify-between border-t border-bn-border pt-3">
								<span className="text-bn-muted">Status</span>
								<span className="text-bn-white">{memberDetail.memberStatus}</span>
							</div>
						</div>
					</Card>

					<Card className="p-5">
						<SectionHeader eyebrow="Following" title="Subscribed teams" />
						{subscribedTeams.length !== 0 ? (
							<div className="flex flex-col gap-3">
								{subscribedTeams.map((team) => (
									<Link
										key={team._id}
										to={`/teams/${team._id}`}
										className="flex items-center gap-3"
									>
										<ImageWithFallback
											src={`${serverApi}/${team.teamImage[0]}`}
											alt={team.teamNick}
											className="h-9 w-9 rounded-full"
										/>
										<span className="text-sm font-medium text-bn-white">
											{team.teamNick}
										</span>
									</Link>
								))}
							</div>
						) : (
							<EmptyState title="No subscribed teams yet" />
						)}
					</Card>
				</div>
			</Container>
		</div>
	);
}
