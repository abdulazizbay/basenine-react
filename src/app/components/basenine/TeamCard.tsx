import { Link } from 'react-router-dom';
import type { Team } from '../../../lib/types/team';
import { serverApi } from '../../../lib/config';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

interface TeamCardProps {
	team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
	return (
		<Link to={`/teams/${team._id}`} className="group block">
			<Card className="overflow-hidden transition-all group-hover:-translate-y-1.5 group-hover:border-bn-red/45 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
				<div className="relative flex h-44 items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(229,72,77,0.14),transparent_55%)] bg-bn-surface-2">
					<div className="absolute h-32 w-32 rounded-full border border-dashed border-white/10" />
					<ImageWithFallback
						src={`${serverApi}/${team.teamImage[0]}`}
						alt={team.teamNick}
						className="relative z-10 h-[92px] w-[92px] rounded-full border-[3px] border-bn-surface shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
					/>
				</div>
				<div className="flex flex-col gap-1 p-5">
					<p className="font-display text-[17px] font-bold text-bn-white">
						{team.teamNick}
					</p>
					<p className="text-xs text-bn-muted">{team.teamAddress}</p>
					<div className="mt-2.5 flex items-center gap-4">
						<span className="text-xs font-semibold text-white/55">
							{team.teamSubscribers.toLocaleString()} subscribers
						</span>
						<span className="text-xs font-semibold text-white/55">
							{team.teamViews.toLocaleString()} views
						</span>
					</div>
				</div>
			</Card>
		</Link>
	);
}
