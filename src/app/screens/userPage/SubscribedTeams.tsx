import { useEffect, useState } from 'react';
import type { Team } from '../../../lib/types/team';
import TeamService from '../../services/TeamService';
import TeamCard from '../../components/basenine/TeamCard';
import EmptyState from '../../components/ui/EmptyState';
import SectionHeader from '../../components/ui/SectionHeader';
import Pagination from '../../components/ui/Pagination';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../lib/utils/error';

const LIMIT = 6;

export default function SubscribedTeams() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		const teamService = new TeamService();
		teamService
			.getFavouriteTeams({ page, limit: LIMIT })
			.then((data) => {
				setTeams(data.list);
				setTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) => toast.error(getErrorMessage(err, 'Could not load subscribed teams.')));
	}, [page]);

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div>
			<SectionHeader eyebrow="Following" title="Subscribed Teams" />

			{teams.length !== 0 ? (
				<>
					<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
						{teams.map((team) => (
							<TeamCard key={team._id} team={team} />
						))}
					</div>
					{total > LIMIT && (
						<Pagination
							page={page}
							count={Math.ceil(total / LIMIT)}
							onChange={handlePageChange}
						/>
					)}
				</>
			) : (
				<EmptyState
					title="No subscribed teams yet"
					description="Follow a team from its page to see it here."
				/>
			)}
		</div>
	);
}
