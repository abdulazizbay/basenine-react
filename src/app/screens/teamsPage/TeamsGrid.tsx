import TeamCard from '../../components/basenine/TeamCard';
import type { Team, TeamInquiry } from '../../../lib/types/team';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';

interface TeamsGridProps {
	teams: Team[];
	setTeamSearch: React.Dispatch<React.SetStateAction<TeamInquiry>>;
}

export default function TeamsGrid({
	teams,
	setTeamSearch,
}: TeamsGridProps) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<input
				onChange={(e) =>
					setTeamSearch((prev) => ({
						...prev,
						search: e.target.value,
						page: 1,
					}))
				}
			/>
			sort by:
			<select
				onChange={(e) => {
					setTeamSearch((prev) => ({
						...prev,
						order: e.target.value as TeamOrder,
						page: 1,
					}));
				}}
			>
				<option value={TeamOrder.CREATED_AT}>Newest</option>
				<option value={TeamOrder.SUBSCRIBERS}>Most Subsribed</option>
				<option value={TeamOrder.VIEWS}>Most Viewed</option>
			</select>
			<select
				onChange={(e) => {
					setTeamSearch((prev) => ({
						...prev,
						page: 1,
						direction: Number(e.target.value) as Direction,
					}));
				}}
			>
				<option value={Direction.ASC}>ASC</option>
				<option value={Direction.DESC}>DESC</option>
			</select>
			{teams.map((team) => (
				<TeamCard key={team._id} team={team} />
			))}
		</div>
	);
}
