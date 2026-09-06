import GameCard from "../../components/basenine/GameCard";
import EmptyState from "../../components/ui/EmptyState";
import type { Game, GameInquiry } from "../../../lib/types/game";
import { GameStatus } from "../../../lib/enums/game.enum";
import { Address } from "../../../lib/enums/common.enum";

interface GamesGridProps {
	games: Game[];
	gameSearch: GameInquiry;
	setGameSearch: React.Dispatch<React.SetStateAction<GameInquiry>>;
}

const STATUS_OPTIONS: { label: string; value?: GameStatus }[] = [
	{ label: "All Games", value: undefined },
	{ label: "Upcoming", value: GameStatus.UPCOMING },
	{ label: "Live", value: GameStatus.PROCESS },
	{ label: "Finished", value: GameStatus.FINISHED },
];

export default function GamesGrid({
	games,
	gameSearch,
	setGameSearch,
}: GamesGridProps) {
	return (
		<div>
			<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-2">
					{STATUS_OPTIONS.map((opt) => (
						<button
							key={opt.label}
							onClick={() =>
								setGameSearch((prev) => ({
									...prev,
									gameStatus: opt.value,
									page: 1,
								}))
							}
							className={`h-10 rounded-lg border px-3.5 text-xs font-semibold transition-colors ${
								gameSearch.gameStatus === opt.value
									? "border-bn-red bg-bn-red/10 text-bn-white"
									: "border-bn-border text-bn-muted hover:text-bn-white"
							}`}
						>
							{opt.label}
						</button>
					))}
				</div>

				<select
					value={gameSearch.gameAddress ?? ""}
					onChange={(e) =>
						setGameSearch((prev) => ({
							...prev,
							gameAddress: e.target.value
								? (e.target.value as Address)
								: undefined,
							page: 1,
						}))
					}
					className="h-10 rounded-lg border border-bn-border bg-bn-surface-2 px-3.5 text-xs font-semibold text-bn-white outline-none"
				>
					<option value="">All Locations</option>
					{Object.values(Address).map((addr) => (
						<option key={addr} value={addr}>
							{addr}
						</option>
					))}
				</select>
			</div>

			{games.length !== 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{games.map((game) => (
						<GameCard key={game._id} game={game} />
					))}
				</div>
			) : (
				<EmptyState title="No games match these filters" />
			)}
		</div>
	);
}
