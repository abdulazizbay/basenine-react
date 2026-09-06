import TeamCard from '../../components/basenine/TeamCard';
import EmptyState from '../../components/ui/EmptyState';
import type { Team, TeamInquiry } from '../../../lib/types/team';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';

interface TeamsGridProps {
	teams: Team[];
	teamSearch: TeamInquiry;
	setTeamSearch: React.Dispatch<React.SetStateAction<TeamInquiry>>;
}

const SORT_OPTIONS: { label: string; value: TeamOrder }[] = [
	{ label: 'Newest', value: TeamOrder.CREATED_AT },
	{ label: 'Most Subscribed', value: TeamOrder.SUBSCRIBERS },
	{ label: 'Most Viewed', value: TeamOrder.VIEWS },
];

export default function TeamsGrid({
	teams,
	teamSearch,
	setTeamSearch,
}: TeamsGridProps) {
	return (
		<div>
			<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
				<div className="flex h-11 items-center gap-2.5 rounded-lg border border-bn-border bg-white/[0.025] px-4 transition-colors focus-within:border-bn-red/50">
					<input
						placeholder="Search teams..."
						onChange={(e) =>
							setTeamSearch((prev) => ({
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
								setTeamSearch((prev) => ({
									...prev,
									order: opt.value,
									page: 1,
								}))
							}
							className={`h-10 rounded-lg border px-3.5 text-xs font-semibold transition-colors ${
								teamSearch.order === opt.value
									? 'border-bn-red bg-bn-red/10 text-bn-white'
									: 'border-bn-border text-bn-muted hover:text-bn-white'
							}`}
						>
							{opt.label}
						</button>
					))}
					<button
						onClick={() =>
							setTeamSearch((prev) => ({
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
						{teamSearch.direction === Direction.DESC ? 'DESC' : 'ASC'}
					</button>
				</div>
			</div>

			{teams.length !== 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{teams.map((team) => (
						<TeamCard key={team._id} team={team} />
					))}
				</div>
			) : (
				<EmptyState title="No teams match your search" />
			)}
		</div>
	);
}
