import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import TeamsGrid from './TeamsGrid';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';
import type { Team, TeamInquiry } from '../../../lib/types/team';

export default function TeamsPage() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [teamTotal, setTeamTotal] = useState<number>(0);
	const [teamSearch, setTeamSearch] = useState<TeamInquiry>({
		order: TeamOrder.CREATED_AT,
		direction: Direction.ASC,
		limit: 8,
		page: 1,
	});
	useEffect(() => {
		const teamService = new TeamService();
		teamService
			.getTeams(teamSearch)
			.then(
				(data) => (
					setTeams(data.list),
					setTeamTotal(data.metaCounter[0]?.total ?? 0)
				),
			)
			.catch((err) => console.log(err));
			
	}, [teamSearch]);


	return (
		<Container className="py-16">
			<SectionHeader eyebrow="The league" title="Teams" />
			<TeamsGrid
				teams={teams}
				setTeamSearch={setTeamSearch}
			/>
		</Container>
	);
}
