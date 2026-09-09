import { useState } from "react";
import GameCard from "../../components/basenine/GameCard";
import EmptyState from "../../components/ui/EmptyState";
import type { Game, GameInquiry } from "../../../lib/types/game";
import type { TeamOption } from "../../../lib/types/team";
import { GameStatus } from "../../../lib/enums/game.enum";
import { Address } from "../../../lib/enums/common.enum";

interface GamesGridProps {
	games: Game[];
	gameSearch: GameInquiry;
	setGameSearch: React.Dispatch<React.SetStateAction<GameInquiry>>;
	teamOptions: TeamOption[];
}

type DateRange = "all" | "week" | "month";

const DATE_OPTIONS: { label: string; value: DateRange }[] = [
	{ label: "All dates", value: "all" },
	{ label: "This week", value: "week" },
	{ label: "This month", value: "month" },
];

const startOfDay = (date: Date) => {
	const value = new Date(date);
	value.setHours(0, 0, 0, 0);
	return value;
};

const endOfDay = (date: Date) => {
	const value = new Date(date);
	value.setHours(23, 59, 59, 999);
	return value;
};

function rangeFor(range: DateRange): { startDate?: Date; endDate?: Date } {
	const now = new Date();

	if (range === "week") {
		const monday = startOfDay(now);
		monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
		const sunday = endOfDay(monday);
		sunday.setDate(monday.getDate() + 6);
		return { startDate: monday, endDate: sunday };
	}

	if (range === "month") {
		return {
			startDate: startOfDay(new Date(now.getFullYear(), now.getMonth(), 1)),
			endDate: endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
		};
	}

	return { startDate: undefined, endDate: undefined };
}

const chipClass = (active: boolean) =>
	`h-10 rounded-lg border px-3.5 text-xs font-semibold transition-colors ${
		active
			? "border-bn-red bg-bn-red/10 text-bn-white"
			: "border-bn-border text-bn-muted hover:text-bn-white"
	}`;

const selectClass =
	"h-10 rounded-lg border border-bn-border bg-bn-surface-2 px-3.5 text-xs font-semibold text-bn-white outline-none";

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
	teamOptions,
}: GamesGridProps) {
	const [dateRange, setDateRange] = useState<DateRange>("all");

	const handleDateRange = (range: DateRange) => {
		setDateRange(range);
		setGameSearch((prev) => ({ ...prev, ...rangeFor(range), page: 1 }));
	};

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
							className={chipClass(gameSearch.gameStatus === opt.value)}
						>
							{opt.label}
						</button>
					))}
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<select
						value={gameSearch.teamId ?? ""}
						onChange={(e) =>
							setGameSearch((prev) => ({
								...prev,
								teamId: e.target.value ? e.target.value : undefined,
								page: 1,
							}))
						}
						className={selectClass}
					>
						<option value="">All Teams</option>
						{teamOptions.map((team) => (
							<option key={team._id} value={team._id}>
								{team.teamNick}
							</option>
						))}
					</select>

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
						className={selectClass}
					>
						<option value="">All Locations</option>
						{Object.values(Address).map((addr) => (
							<option key={addr} value={addr}>
								{addr}
							</option>
						))}
					</select>

					<select
						value={dateRange}
						onChange={(e) => handleDateRange(e.target.value as DateRange)}
						className={selectClass}
					>
						{DATE_OPTIONS.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
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
