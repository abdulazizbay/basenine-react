import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import TeamsGrid from './TeamsGrid';
import { mockTeams } from '../../../lib/mocks/teams.mock';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';
import type { Teams } from '../../../lib/types/team';

export default function TeamsPage() {
	// const [teams, setTeams] = useState<Teams>([]);
	// useEffect(() => {
	// 	const teamService = new TeamService();
	// 	teamService
	// 		.getTeams({
	// 			order: TeamOrder.SUBSCRIBERS,
	// 			direction: Direction.DESC,
	// 			limit: 8,
	// 			page: 1,
	// 		})
	// 		.then((data) => setTeams(data.list))
	// 		.catch((err) => console.log(err));
	// }, []);
	return (
		<Container className="py-16">
			<SectionHeader eyebrow="The league" title="Teams" />
			<TeamsGrid teams={mockTeams} />
		</Container>
	);
}
