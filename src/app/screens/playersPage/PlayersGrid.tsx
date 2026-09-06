import PlayerCard from "../../components/basenine/PlayerCard";
import EmptyState from "../../components/ui/EmptyState";
import type { Player, PlayerInquiry } from "../../../lib/types/player";
import { PlayerOrder } from "../../../lib/enums/player.enum";
import { Direction } from "../../../lib/types/common";

interface PlayersGridProps {
	players: Player[];
	playerSearch: PlayerInquiry;
	setPlayerSearch: React.Dispatch<React.SetStateAction<PlayerInquiry>>;
}

const SORT_OPTIONS: { label: string; value: PlayerOrder }[] = [
	{ label: "Newest", value: PlayerOrder.CREATED_AT },
	{ label: "Most Viewed", value: PlayerOrder.VIEWS },
];

export default function PlayersGrid({
	players,
	playerSearch,
	setPlayerSearch,
}: PlayersGridProps) {
	return (
		<div>
			<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
				<div className="flex h-11 items-center gap-2.5 rounded-lg border border-bn-border bg-white/[0.025] px-4 transition-colors focus-within:border-bn-red/50">
					<input
						placeholder="Search players..."
						onChange={(e) =>
							setPlayerSearch((prev) => ({
								...prev,
								search: e.target.value,
								page: 1,
							}))
						}
						className="w-40 bg-transparent text-[13px] text-bn-white outline-none placeholder:text-bn-muted/60 sm:w-52"
					/>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					{SORT_OPTIONS.map((opt) => (
						<button
							key={opt.value}
							onClick={() =>
								setPlayerSearch((prev) => ({
									...prev,
									order: opt.value,
									page: 1,
								}))
							}
							className={`h-10 rounded-lg border px-3.5 text-xs font-semibold transition-colors ${
								playerSearch.order === opt.value
									? "border-bn-red bg-bn-red/10 text-bn-white"
									: "border-bn-border text-bn-muted hover:text-bn-white"
							}`}
						>
							{opt.label}
						</button>
					))}
					<button
						onClick={() =>
							setPlayerSearch((prev) => ({
								...prev,
								page: 1,
								direction:
									prev.direction === Direction.DESC
										? Direction.ASC
										: Direction.DESC,
							}))
						}
						className="h-10 rounded-lg border border-bn-border bg-bn-surface-2 px-3.5 text-[11px] font-bold tracking-wide text-bn-white transition-colors hover:border-bn-red/50"
					>
						{playerSearch.direction === Direction.DESC ? "DESC" : "ASC"}
					</button>
				</div>
			</div>

			{players.length !== 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{players.map((player) => (
						<PlayerCard key={player._id} player={player} />
					))}
				</div>
			) : (
				<EmptyState title="No players match your search" />
			)}
		</div>
	);
}
