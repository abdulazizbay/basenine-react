import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import ImageWithFallback from '../../components/ui/ImageWithFallback';
import GameService from '../../services/GameService';
import type { TeamStanding } from '../../../lib/types/team';
import { serverApi } from '../../../lib/config';
import { getErrorMessage } from '../../../lib/utils/error';

const formatPct = (pct: number) =>
	pct >= 1 ? '1.000' : pct.toFixed(3).replace(/^0/, '');

const formatDiff = (diff: number) => (diff > 0 ? `+${diff}` : String(diff));

const formatGamesBehind = (gamesBehind: number) =>
	gamesBehind === 0
		? '—'
		: gamesBehind % 1 === 0
			? String(gamesBehind)
			: gamesBehind.toFixed(1);

const headCellClass =
	'px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-bn-muted';
const cellClass = 'px-3 py-3 text-sm text-bn-white';

export default function StandingsPage() {
	const [standings, setStandings] = useState<TeamStanding[]>([]);

	useEffect(() => {
		const gameService = new GameService();
		gameService
			.getStandings()
			.then((data) => setStandings(data))
			.catch((err) =>
				toast.error(getErrorMessage(err, 'Could not load the standings.')),
			);
	}, []);

	return (
		<div>
			<section className="bg-linear-to-b from-bn-surface to-bn-bg pb-8 pt-32 sm:pt-40">
				<Container>
					<SectionHeader eyebrow="The league" title="Standings" />
					<p className="-mt-6 max-w-lg text-sm text-bn-muted">
						Every team that has played, ranked by win percentage.
					</p>
				</Container>
			</section>

			<Container className="py-12">
				{standings.length !== 0 ? (
					<div className="overflow-x-auto rounded-2xl border border-bn-border bg-bn-surface">
						<table className="w-full min-w-[720px] border-collapse">
							<thead>
								<tr className="border-b border-bn-border bg-white/[0.02]">
									<th className={`${headCellClass} w-12 text-center`}>#</th>
									<th className={`${headCellClass} text-left`}>Team</th>
									<th className={`${headCellClass} text-center`}>G</th>
									<th className={`${headCellClass} text-center`}>W</th>
									<th className={`${headCellClass} text-center`}>L</th>
									<th className={`${headCellClass} text-center`}>D</th>
									<th className={`${headCellClass} text-center`}>PCT</th>
									<th className={`${headCellClass} text-center`}>RF</th>
									<th className={`${headCellClass} text-center`}>RA</th>
									<th className={`${headCellClass} text-center`}>DIFF</th>
									<th className={`${headCellClass} text-center`}>GB</th>
								</tr>
							</thead>
							<tbody>
								{standings.map((standing, index) => (
									<tr
										key={standing.team._id}
										className="border-b border-bn-border last:border-b-0 transition-colors hover:bg-white/[0.03]"
									>
										<td
											className={`${cellClass} text-center font-display font-bold ${
												index === 0 ? 'text-bn-red' : 'text-bn-muted'
											}`}
										>
											{index + 1}
										</td>
										<td className={cellClass}>
											<Link
												to={`/teams/${standing.team._id}`}
												className="flex items-center gap-3 transition-colors hover:text-bn-red-light"
											>
												<ImageWithFallback
													src={`${serverApi}/${standing.team.teamImage[0]}`}
													alt={standing.team.teamNick}
													className="h-8 w-8 shrink-0 rounded-full"
												/>
												<span className="font-semibold">
													{standing.team.teamNick}
												</span>
											</Link>
										</td>
										<td className={`${cellClass} text-center text-bn-muted`}>
											{standing.games}
										</td>
										<td className={`${cellClass} text-center font-semibold`}>
											{standing.wins}
										</td>
										<td className={`${cellClass} text-center text-bn-muted`}>
											{standing.losses}
										</td>
										<td className={`${cellClass} text-center text-bn-muted`}>
											{standing.draws}
										</td>
										<td
											className={`${cellClass} text-center font-display font-bold`}
										>
											{formatPct(standing.winPct)}
										</td>
										<td className={`${cellClass} text-center text-bn-muted`}>
											{standing.runsFor}
										</td>
										<td className={`${cellClass} text-center text-bn-muted`}>
											{standing.runsAgainst}
										</td>
										<td
											className={`${cellClass} text-center font-semibold ${
												standing.runDiff > 0
													? 'text-bn-white'
													: standing.runDiff < 0
														? 'text-bn-muted'
														: 'text-bn-muted'
											}`}
										>
											{formatDiff(standing.runDiff)}
										</td>
										<td className={`${cellClass} text-center text-bn-muted`}>
											{formatGamesBehind(standing.gamesBehind)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<EmptyState
						title="No standings yet"
						description="The table fills in as games are played and final scores are recorded."
					/>
				)}
			</Container>
		</div>
	);
}
