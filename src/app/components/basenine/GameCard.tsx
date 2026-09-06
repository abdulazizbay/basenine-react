import type { Game } from "../../../lib/types/game";
import type { Team } from "../../../lib/types/team";
import { serverApi } from "../../../lib/config";
import Card from "../ui/Card";
import ImageWithFallback from "../ui/ImageWithFallback";

interface GameCardProps {
	game: Game;
}

function teamOf(value: string | Team): Team | null {
	return typeof value === "object" ? value : null;
}

export default function GameCard({ game }: GameCardProps) {
	const teamA = teamOf(game.teamAId);
	const teamB = teamOf(game.teamBId);
	const gameDate = new Date(game.gameDate);

	return (
		<Card className="overflow-hidden p-4">
			<p className="text-[11px] uppercase tracking-wide text-bn-muted">{game.gameStatus}</p>
			<div className="mt-3 flex items-center justify-between gap-4">
				<div className="flex flex-1 items-center gap-2">
					<ImageWithFallback
						src={teamA ? `${serverApi}/${teamA.teamImage[0]}` : undefined}
						alt={teamA?.teamNick ?? "Team A"}
						className="h-10 w-10 shrink-0 rounded-full"
					/>
					<span className="text-sm font-semibold text-bn-white">
						{teamA?.teamNick ?? "TBD"}
					</span>
				</div>
				<span className="text-xs text-bn-muted">vs</span>
				<div className="flex flex-1 items-center justify-end gap-2">
					<span className="text-sm font-semibold text-bn-white">
						{teamB?.teamNick ?? "TBD"}
					</span>
					<ImageWithFallback
						src={teamB ? `${serverApi}/${teamB.teamImage[0]}` : undefined}
						alt={teamB?.teamNick ?? "Team B"}
						className="h-10 w-10 shrink-0 rounded-full"
					/>
				</div>
			</div>
			<p className="mt-3 text-xs text-bn-muted">
				{gameDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
				{" · "}
				{gameDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
				{" · "}
				{game.gameAddress}
			</p>
		</Card>
	);
}
