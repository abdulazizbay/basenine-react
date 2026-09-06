import { Link, useParams } from 'react-router-dom';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import ImageWithFallback from '../../components/ui/ImageWithFallback';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import type { Team } from '../../../lib/types/team';
import type {
	TeamSubscriber,
	TeamSubscribers,
} from '../../../lib/types/favourite';
import { useAuth } from '../../hooks/useAuth';
import PlayerService from '../../services/PlayerService';
import { PlayerOrder } from '../../../lib/enums/player.enum';
import { Direction } from '../../../lib/types/common';
import { type Players } from '../../../lib/types/player';
import GameService from '../../services/GameService';
import { GameStatus } from '../../../lib/enums/game.enum';
import type { Game, Games } from '../../../lib/types/game';
import { useAuthModal } from '../../hooks/useAuthModal';
import { teamOf } from '../../../lib/utils/relations';
import { serverApi } from '../../../lib/config';

const POSITION_LABEL: Record<string, string> = {
	PITCHER: 'Pitcher',
	CATCHER: 'Catcher',
	BASEMAN1: '1st Base',
	BASEMAN2: '2nd Base',
	BASEMAN3: '3rd Base',
	SHORTSTOP: 'Shortstop',
	LEFTFIELDER: 'Left Field',
	CENTERFIELDER: 'Center Field',
	RIGHTFIELDER: 'Right Field',
};

export default function TeamDetail() {
	const { authMember } = useAuth();
	const { openLogin } = useAuthModal();
	const { teamId } = useParams<{ teamId: string }>();
	const [chosenTeam, setChosenTeam] = useState<Team | null>(null);
	const [chosenTeamSubscribers, setChosenTeamSubscribers] =
		useState<TeamSubscribers | null>(null);
	const [chosenTeamPlayers, setchosenTeamPlayers] = useState<Players | null>(
		null,
	);
	const [chosenTeamGames, setChosenTeamGames] = useState<Games | null>(null);

	useEffect(() => {
		if (!teamId) return;
		const fetchGetTeam = async () => {
			try {
				const teamService = new TeamService();
				const team = await teamService.getTeam(teamId);
				setChosenTeam(team);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGetTeam();

		const fetchGetSubscribers = async () => {
			try {
				const teamService = new TeamService();
				const teamSubcribers = await teamService.getTeamSubscribers(
					teamId,
					1,
					10,
				);
				setChosenTeamSubscribers(teamSubcribers);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGetSubscribers();
		const fetchGetPlayers = async () => {
			try {
				const playerService = new PlayerService();
				const result = await playerService.getPlayers({
					order: PlayerOrder.VIEWS,
					direction: Direction.DESC,
					page: 1,
					limit: 5,
					teamId: teamId,
				});
				setchosenTeamPlayers(result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGetPlayers();

		const fetchGetGames = async () => {
			try {
				const gameService = new GameService();
				const result = await gameService.getGames({
					page: 1,
					limit: 5,
					gameStatus: GameStatus.UPCOMING,
					teamId: teamId,
				});
				setChosenTeamGames(result);
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGetGames();
	}, [teamId]);

	const handleSubscribeToggle = async () => {
		if (!teamId) return;
		if (!authMember) {
			openLogin();
			return;
		}
		try {
			const teamService = new TeamService();

			if (chosenTeam?.meFavourited) {
				await teamService.unSubscribeTeam(teamId);
				setChosenTeam((prev) =>
					prev
						? {
								...prev,
								teamSubscribers: prev.teamSubscribers - 1,
								meFavourited: false,
							}
						: prev,
				);
			} else {
				await teamService.subscribeTeam(teamId);
				setChosenTeam((prev) =>
					prev
						? {
								...prev,
								teamSubscribers: prev.teamSubscribers + 1,
								meFavourited: true,
							}
						: prev,
				);
			}
			const teamSubcribers = await teamService.getTeamSubscribers(
				teamId,
				1,
				10,
			);
			setChosenTeamSubscribers(teamSubcribers);
		} catch (err) {
			console.log(err);
		}
	};
	if (!chosenTeam) return null;

	return (
		<div>
			<section className="relative overflow-hidden bg-linear-to-b from-bn-surface to-bn-bg pb-16 pt-32 sm:pt-40">
				<Container className="flex flex-col gap-8 sm:flex-row sm:items-center">
					<ImageWithFallback
						src={`${serverApi}/${chosenTeam.teamImage[0]}`}
						alt={chosenTeam.teamNick}
						className="h-48 w-48 shrink-0 rounded-2xl bg-bn-surface-2 p-4"
					/>
					<div className="flex-1">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-bn-red">
							{chosenTeam.teamAddress}
						</p>
						<h1 className="mt-2 font-display text-3xl font-bold text-bn-white sm:text-4xl">
							{chosenTeam.teamNick}
						</h1>

						<div className="mt-6 flex gap-8">
							<div>
								<p className="font-display text-xl font-bold text-bn-white">
									{chosenTeam.teamSubscribers.toLocaleString()}
								</p>
								<p className="text-xs text-bn-muted">Subscribers</p>
							</div>
							<div className="border-l border-bn-border pl-8">
								<p className="font-display text-xl font-bold text-bn-white">
									{chosenTeam.teamViews.toLocaleString()}
								</p>
								<p className="text-xs text-bn-muted">Views</p>
							</div>
							<div className="border-l border-bn-border pl-8">
								<p className="font-display text-xl font-bold text-bn-white">
									{chosenTeamPlayers?.list.length ?? 0}
								</p>
								<p className="text-xs text-bn-muted">Players</p>
							</div>
						</div>

						<Button onClick={handleSubscribeToggle} className="mt-6">
							{chosenTeam.meFavourited ? 'Unsubscribe' : 'Subscribe'}
						</Button>
					</div>
				</Container>
			</section>

			{chosenTeamSubscribers && chosenTeamSubscribers.list.length !== 0 && (
				<Container className="py-12">
					<SectionHeader eyebrow="Supporters" title="Subscribers" />
					<div className="flex flex-wrap gap-4">
						{chosenTeamSubscribers.list.map((subscriber: TeamSubscriber) => (
							<div key={subscriber._id} className="flex items-center gap-2">
								<ImageWithFallback
									src={`${serverApi}/${subscriber.memberImage}`}
									alt={subscriber.memberNick}
									className="h-10 w-10 rounded-full"
								/>
								<span className="text-sm text-bn-white">
									{subscriber.memberNick}
								</span>
							</div>
						))}
					</div>
				</Container>
			)}

			<Container className="py-12">
				<SectionHeader eyebrow="The roster" title="Players" />
				{chosenTeamPlayers && chosenTeamPlayers.list.length !== 0 ? (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
						{chosenTeamPlayers.list.map((player) => (
							<Link key={player._id} to={`/players/${player._id}`}>
								<Card className="overflow-hidden">
									<div className="relative">
										<ImageWithFallback
											src={`${serverApi}/${player.playerImages[0]}`}
											alt={player.playerNick}
											className="h-32 w-full"
										/>
										<span className="absolute right-2 top-2 rounded-full bg-bn-bg/80 px-2 py-0.5 text-[10px] font-semibold text-bn-white">
											{POSITION_LABEL[player.playerPosition] ??
												player.playerPosition}
										</span>
									</div>
									<div className="p-3">
										<p className="text-xs text-bn-muted">
											#{player.playerNumber}
										</p>
										<p className="text-sm font-semibold text-bn-white">
											{player.playerNick}
										</p>
									</div>
								</Card>
							</Link>
						))}
					</div>
				) : (
					<EmptyState title="No players on this roster yet" />
				)}
			</Container>

			<Container className="py-12">
				<SectionHeader eyebrow="Schedule" title="Upcoming Games" />
				{chosenTeamGames && chosenTeamGames.list.length !== 0 ? (
					<div className="flex flex-col gap-3">
						{chosenTeamGames.list.map((game: Game) => {
							const teamA = teamOf(game.teamAId);
							const teamB = teamOf(game.teamBId);
							const opponent = teamA?._id === teamId ? teamB : teamA;
							const gameDate = new Date(game.gameDate);

							return (
								<Link key={game._id} to={`/games/${game._id}`}>
									<Card className="flex items-center justify-between p-4">
										<div className="flex items-center gap-3">
											<ImageWithFallback
												src={
													opponent
														? `${serverApi}/${opponent.teamImage[0]}`
														: undefined
												}
												alt={opponent?.teamNick ?? 'TBD'}
												className="h-10 w-10 rounded-full"
											/>
											<span className="text-sm font-medium text-bn-white">
												vs {opponent?.teamNick ?? 'TBD'}
											</span>
										</div>
										<div className="text-right text-xs text-bn-muted">
											<p>
												{gameDate.toLocaleDateString(undefined, {
													month: 'short',
													day: 'numeric',
												})}
												{' · '}
												{gameDate.toLocaleTimeString(undefined, {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</p>
											<p>{game.gameAddress}</p>
										</div>
									</Card>
								</Link>
							);
						})}
					</div>
				) : (
					<EmptyState title="No upcoming games scheduled" />
				)}
			</Container>
		</div>
	);
}
