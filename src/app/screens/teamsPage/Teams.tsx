import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Pagination from '../../components/ui/Pagination';
import TeamsGrid from './TeamsGrid';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';
import type { Team, TeamInquiry } from '../../../lib/types/team';

export default function Teams() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [teamTotal, setTeamTotal] = useState<number>(0);
	const [teamSearch, setTeamSearch] = useState<TeamInquiry>({
		order: TeamOrder.CREATED_AT,
		direction: Direction.DESC,
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

	const handlePageChange = (page: number) => {
		setTeamSearch((prev) => ({ ...prev, page }));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const pageCount = Math.max(1, Math.ceil(teamTotal / teamSearch.limit));

	return (
		<div>
			<section className="bg-linear-to-b from-bn-surface to-bn-bg pb-8 pt-32 sm:pt-40">
				<Container>
					<SectionHeader eyebrow="The league" title="Teams" />
					<p className="-mt-6 max-w-lg text-sm text-bn-muted">
						Browse every club, follow the ones you love, and never miss a
						moment.
					</p>
				</Container>
			</section>

			<Container className="py-12">
				<p className="mb-4 text-xs text-bn-muted">{teamTotal} teams found</p>
				<TeamsGrid
					teams={teams}
					teamSearch={teamSearch}
					setTeamSearch={setTeamSearch}
				/>
				{teamTotal > teamSearch.limit && (
					<Pagination
						page={teamSearch.page}
						count={pageCount}
						onChange={handlePageChange}
					/>
				)}
			</Container>
		</div>
	);
}
