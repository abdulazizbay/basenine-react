import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlayerService from '../../services/PlayerService';
import type { Player } from '../../../lib/types/player';
import { teamOf } from '../../../lib/utils/relations';
import { serverApi } from '../../../lib/config';
import { POSITION_INFO, POSITION_ORDER } from '../../../lib/data/playerPositions';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Card from '../../components/ui/Card';
import ImageWithFallback from '../../components/ui/ImageWithFallback';
import PositionDiagram from './PositionDiagram';

export default function PlayerDetail() {
	const { playerId } = useParams<{ playerId: string }>();
	const [chosenPlayer, setChosenPlayer] = useState<Player | null>(null);

	useEffect(() => {
		if (!playerId) return;
		const fetchGetPlayer = async () => {
			try {
				const playerService = new PlayerService();
				const result = await playerService.getPlayer(playerId);
				setChosenPlayer(result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGetPlayer();
	}, [playerId]);

	if (!chosenPlayer) return null;

	const team = teamOf(chosenPlayer.teamId);
	const positionInfo = POSITION_INFO[chosenPlayer.playerPosition];
	const positionLabel = positionInfo?.label ?? chosenPlayer.playerPosition;

	return (
		<div>
			<section className="relative overflow-hidden border-b border-bn-border bg-bn-surface pb-16 pt-32 sm:pt-40">
				<div className="pointer-events-none absolute left-[14%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-bn-red/10 blur-[90px]" />

				<Container className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
					<div className="relative w-52 shrink-0 overflow-hidden rounded-2xl border border-bn-border bg-bn-surface-2 shadow-[0_30px_70px_rgba(0,0,0,0.5)] sm:w-64">
						<ImageWithFallback
							src={
								chosenPlayer.playerImages?.[0]
									? `${serverApi}/${chosenPlayer.playerImages[0]}`
									: null
							}
							alt={chosenPlayer.playerNick}
							className="aspect-[3/4] w-full"
						/>
						<span className="absolute right-3 top-3 rounded-full border border-white/15 bg-bn-bg/65 px-3 py-1 text-[11px] font-bold text-bn-white backdrop-blur-sm">
							{positionInfo?.abbr ?? chosenPlayer.playerPosition}
						</span>
					</div>

					<div className="min-w-0 flex-1">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-bn-red">
							Jersey #{chosenPlayer.playerNumber}
						</p>
						<h1 className="mt-2 font-display text-3xl font-bold text-bn-white sm:text-5xl">
							{chosenPlayer.playerNick}
						</h1>

						<div className="mt-6 flex items-center justify-center gap-6 sm:justify-start">
							<div>
								<p className="font-display text-xl font-bold text-bn-white">
									{chosenPlayer.playerViews.toLocaleString()}
								</p>
								<p className="mt-0.5 text-[11px] text-bn-muted">Views</p>
							</div>
							<div className="border-l border-bn-border pl-6">
								<p className="font-display text-xl font-bold text-bn-white">
									{chosenPlayer.playerHeight ? `${chosenPlayer.playerHeight} cm` : '—'}
								</p>
								<p className="mt-0.5 text-[11px] text-bn-muted">Height</p>
							</div>
							<div className="border-l border-bn-border pl-6">
								<p className="font-display text-xl font-bold text-bn-white">
									{positionLabel}
								</p>
								<p className="mt-0.5 text-[11px] text-bn-muted">Position</p>
							</div>
						</div>

						{team ? (
							<Link to={`/teams/${team._id}`} className="mt-7 inline-flex">
								<Card className="flex items-center gap-3.5 py-3 pl-3 pr-5 transition-all hover:-translate-y-0.5 hover:border-bn-red/50">
									<ImageWithFallback
										src={`${serverApi}/${team.teamImage[0]}`}
										alt={team.teamNick}
										className="h-11 w-11 rounded-full border-2 border-bn-surface-2"
									/>
									<div className="flex flex-col">
										<span className="text-[10px] font-semibold uppercase tracking-wide text-bn-muted">
											Team
										</span>
										<span className="font-display text-sm font-bold text-bn-white">
											{team.teamNick}
										</span>
									</div>
									<span className="text-bn-red">&rarr;</span>
								</Card>
							</Link>
						) : (
							<div className="mt-7 inline-flex flex-col rounded-2xl border border-bn-border px-5 py-3 text-left">
								<span className="text-[10px] font-semibold uppercase tracking-wide text-bn-muted">
									Team
								</span>
								<span className="font-display text-sm font-bold text-bn-white">
									Free Agent
								</span>
							</div>
						)}
					</div>
				</Container>
			</section>

			<Container className="py-16">
				<SectionHeader eyebrow="Scouting report" title="Position guide" />
				<div className="flex flex-col gap-8 lg:flex-row lg:items-start">
					<div className="w-full max-w-[360px] shrink-0 rounded-2xl border border-bn-border bg-bn-surface p-5">
						<PositionDiagram activePosition={chosenPlayer.playerPosition} />
					</div>

					<div className="flex min-w-0 flex-1 flex-col gap-3">
						{POSITION_ORDER.map((pos) => {
							const info = POSITION_INFO[pos];
							const isActive = pos === chosenPlayer.playerPosition;
							return (
								<div
									key={pos}
									className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
										isActive
											? 'border-bn-red/50 bg-bn-red/10'
											: 'border-bn-border bg-bn-surface'
									}`}
								>
									<span
										className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold ${
											isActive
												? 'bg-bn-red text-white'
												: 'bg-bn-surface-2 text-bn-muted'
										}`}
									>
										{info.abbr}
									</span>
									<div>
										<p className="font-display text-sm font-bold text-bn-white">
											{info.label}{' '}
											<span className="font-sans font-normal text-bn-muted">
												({info.abbr})
											</span>
										</p>
										<p className="mt-1 text-xs leading-relaxed text-bn-muted">
											{info.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Container>
		</div>
	);
}
