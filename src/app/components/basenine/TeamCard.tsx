import { Link } from 'react-router-dom';
import type { Team } from '../../../lib/types/team';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

interface TeamCardProps {
	team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
	return (
		<Link to={`/teams/${team._id}`}>
			<Card className="overflow-hidden">
				<ImageWithFallback
					src={team.teamImage[0]}
					alt={team.teamNick}
					className="h-40 w-full"
				/>
				<div className="p-4">
					<p className="font-display text-base font-semibold text-bn-white">
						{team.teamNick}
					</p>
					<p className="mt-1 text-xs text-bn-muted">{team.teamAddress}</p>
					<p className="mt-3 text-xs font-medium text-bn-muted">
						{team.teamSubscribers.toLocaleString()} subscribers
					</p>
				</div>
			</Card>
		</Link>
	);
}
