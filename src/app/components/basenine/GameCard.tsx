import { Link } from "react-router-dom";
import type { Game } from "../../../lib/types/game";
import { GameStatus } from "../../../lib/enums/game.enum";
import { teamOf } from "../../../lib/utils/relations";
import { serverApi } from "../../../lib/config";
import Card from "../ui/Card";
import ImageWithFallback from "../ui/ImageWithFallback";

interface GameCardProps {
	game: Game;
}

const STATUS_LABEL: Record<GameStatus, string> = {
	[GameStatus.UPCOMING]: "Upcoming",
	[GameStatus.PROCESS]: "Live",
	[GameStatus.FINISHED]: "Finished",
};

const STATUS_BADGE_CLASS: Record<GameStatus, string> = {
	[GameStatus.UPCOMING]: "border border-bn-border text-bn-muted",
	[GameStatus.PROCESS]: "bg-bn-red text-white",
	[GameStatus.FINISHED]: "bg-bn-surface-2 text-bn-muted",
};

export default function GameCard({ game }: GameCardProps) {
	const teamA = teamOf(game.teamAId);
	const teamB = teamOf(game.teamBId);
	const gameDate = new Date(game.gameDate);

	return (
		<Link to={`/games/${game._id}`} className="group block">
			<Card className="p-6 transition-all group-hover:-translate-y-1.5 group-hover:border-bn-red/45 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
				<span
					className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_BADGE_CLASS[game.gameStatus]}`}
				>
					{game.gameStatus === GameStatus.PROCESS && (
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
					)}
					{STATUS_LABEL[game.gameStatus] ?? game.gameStatus}
				</span>

				<div className="mt-5 flex items-center gap-4">
					<div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
						<ImageWithFallback
							src={teamA ? `${serverApi}/${teamA.teamImage[0]}` : undefined}
							alt={teamA?.teamNick ?? "Team A"}
							className="h-14 w-14 rounded-full border-2 border-bn-border"
						/>
						<span className="w-full truncate text-center font-display text-[13px] font-bold text-bn-white">
							{teamA?.teamNick ?? "TBD"}
						</span>
					</div>
					<span className="shrink-0 font-display text-xs font-extrabold text-bn-muted">
						VS
					</span>
					<div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
						<ImageWithFallback
							src={teamB ? `${serverApi}/${teamB.teamImage[0]}` : undefined}
							alt={teamB?.teamNick ?? "Team B"}
							className="h-14 w-14 rounded-full border-2 border-bn-border"
						/>
						<span className="w-full truncate text-center font-display text-[13px] font-bold text-bn-white">
							{teamB?.teamNick ?? "TBD"}
						</span>
					</div>
				</div>

				<div className="mt-5 flex flex-wrap gap-3.5 border-t border-bn-border pt-4 text-xs text-bn-muted">
					<span>
						{gameDate.toLocaleDateString(undefined, {
							month: "short",
							day: "numeric",
						})}
					</span>
					<span>
						{gameDate.toLocaleTimeString(undefined, {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
					<span>{game.gameAddress}</span>
				</div>
			</Card>
		</Link>
	);
}
