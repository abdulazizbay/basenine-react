import { Link } from 'react-router-dom';
import type { Game } from '../../../lib/types/game';
import { teamOf } from '../../../lib/utils/relations';
import { getGameScore } from '../../../lib/utils/game';
import { serverApi } from '../../../lib/config';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

interface TeamGameRowProps {
	game: Game;
	teamId: string | undefined;
}

type Outcome = 'W' | 'L' | 'D';

const OUTCOME_CLASS: Record<Outcome, string> = {
	W: 'bg-bn-red text-white',
	L: 'border border-bn-border text-bn-muted',
	D: 'bg-bn-surface-2 text-bn-muted',
};

export default function TeamGameRow({ game, teamId }: TeamGameRowProps) {
	const teamA = teamOf(game.teamAId);
	const teamB = teamOf(game.teamBId);
	const isTeamA = teamA?._id === teamId;
	const opponent = isTeamA ? teamB : teamA;
	const gameDate = new Date(game.gameDate);

	const score = getGameScore(game);
	const ours = score ? (isTeamA ? score.a : score.b) : null;
	const theirs = score ? (isTeamA ? score.b : score.a) : null;

	const outcome: Outcome | null =
		ours === null || theirs === null
			? null
			: ours > theirs
				? 'W'
				: ours < theirs
					? 'L'
					: 'D';

	return (
		<Link to={`/games/${game._id}`}>
			<Card className="flex items-center justify-between p-4 transition-colors hover:border-bn-red/40">
				<div className="flex items-center gap-3">
					<ImageWithFallback
						src={opponent ? `${serverApi}/${opponent.teamImage[0]}` : undefined}
						alt={opponent?.teamNick ?? 'TBD'}
						className="h-10 w-10 rounded-full"
					/>
					<span className="text-sm font-medium text-bn-white">
						vs {opponent?.teamNick ?? 'TBD'}
					</span>
				</div>

				{outcome ? (
					<div className="flex items-center gap-3">
						<span
							className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${OUTCOME_CLASS[outcome]}`}
						>
							{outcome}
						</span>
						<span className="font-display text-sm font-bold text-bn-white">
							{ours} <span className="text-bn-muted">&ndash;</span> {theirs}
						</span>
					</div>
				) : (
					<div className="text-right text-xs text-bn-muted">
						<p>
							{gameDate.toLocaleDateString(undefined, {
								month: 'short',
								day: 'numeric',
							})}
							{' · '}
							{gameDate.toLocaleTimeString(undefined, {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</p>
						<p>{game.gameAddress}</p>
					</div>
				)}
			</Card>
		</Link>
	);
}
