import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameService from '../../services/GameService';
import type { Game } from '../../../lib/types/game';
import { GameStatus } from '../../../lib/enums/game.enum';
import { teamOf } from '../../../lib/utils/relations';
import { serverApi } from '../../../lib/config';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Card from '../../components/ui/Card';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

const STATUS_LABEL: Record<GameStatus, string> = {
	[GameStatus.UPCOMING]: 'Upcoming',
	[GameStatus.PROCESS]: 'Live',
	[GameStatus.FINISHED]: 'Finished',
};

const STATUS_BADGE_CLASS: Record<GameStatus, string> = {
	[GameStatus.UPCOMING]: 'border border-bn-border text-bn-muted',
	[GameStatus.PROCESS]: 'bg-bn-red text-white shadow-[0_0_25px_rgba(229,72,77,0.4)]',
	[GameStatus.FINISHED]: 'bg-bn-surface-2 text-bn-muted',
};

const GAMEDAY_STEPS = [
	{
		number: '01',
		title: 'Arrive at the Stadium',
		desc: 'Fans arrive early, find their seats, and soak in the pregame atmosphere.',
	},
	{
		number: '02',
		title: 'First Pitch',
		desc: 'The starting pitcher throws the opening pitch and the game begins.',
	},
	{
		number: '03',
		title: 'Nine Innings',
		desc: 'Both teams take turns batting and fielding across nine innings.',
	},
	{
		number: '04',
		title: 'Winner Determined',
		desc: 'The team with the most runs after the final out takes the win.',
	},
];

const BASEBALL_BASICS = [
	{
		value: '9',
		label: 'Innings',
		desc: 'A standard game is played over nine innings, each split into a top and bottom half.',
	},
	{
		value: '3',
		label: 'Outs',
		desc: 'Each half-inning ends once the fielding team records three outs.',
	},
	{
		value: 'Extra',
		label: 'Innings',
		desc: 'If the score is tied after nine innings, the game continues into extra innings.',
	},
];

export default function GameDetail() {
	const { gameId } = useParams<{ gameId: string }>();
	const [chosenGame, setChosenGame] = useState<Game | null>(null);

	useEffect(() => {
		if (!gameId) return;
		const fetchGetGame = async () => {
			try {
				const gameService = new GameService();
				const result = await gameService.getGame(gameId);
				setChosenGame(result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchGetGame();
	}, [gameId]);

	if (!chosenGame) return null;

	const teamA = teamOf(chosenGame.teamAId);
	const teamB = teamOf(chosenGame.teamBId);
	const gameDate = new Date(chosenGame.gameDate);
	const statusLabel = STATUS_LABEL[chosenGame.gameStatus] ?? chosenGame.gameStatus;

	return (
		<div>
			<section className="relative overflow-hidden border-b border-bn-border bg-bn-surface pb-20 pt-32 sm:pt-40">
				<div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bn-red/10 blur-[90px]" />

				<Container className="relative flex flex-col items-center gap-10 text-center">
					<span
						className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide ${STATUS_BADGE_CLASS[chosenGame.gameStatus]}`}
					>
						{chosenGame.gameStatus === GameStatus.PROCESS && (
							<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
						)}
						{statusLabel}
					</span>

					<div className="flex items-center gap-6 sm:gap-14">
						<Link
							to={teamA ? `/teams/${teamA._id}` : '#'}
							onClick={(e) => {
								if (!teamA) e.preventDefault();
							}}
							className="group flex w-28 flex-col items-center gap-4 transition-transform hover:-translate-y-1 sm:w-48"
						>
							<div className="rounded-full bg-linear-to-br from-bn-red/55 to-white/5 p-1 shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
								<ImageWithFallback
									src={teamA ? `${serverApi}/${teamA.teamImage[0]}` : null}
									alt={teamA?.teamNick ?? 'Team A'}
									className="h-20 w-20 rounded-full border-[3px] border-bn-surface sm:h-32 sm:w-32"
								/>
							</div>
							<span className="font-display text-sm font-bold text-bn-white transition-colors group-hover:text-bn-red-light sm:text-xl">
								{teamA?.teamNick ?? 'TBD'}
							</span>
						</Link>

						<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bn-red shadow-[0_0_0_8px_rgba(229,72,77,0.08),0_15px_35px_rgba(229,72,77,0.4)] sm:h-16 sm:w-16">
							<span className="font-display text-xs font-extrabold tracking-wide text-white sm:text-sm">
								VS
							</span>
						</div>

						<Link
							to={teamB ? `/teams/${teamB._id}` : '#'}
							onClick={(e) => {
								if (!teamB) e.preventDefault();
							}}
							className="group flex w-28 flex-col items-center gap-4 transition-transform hover:-translate-y-1 sm:w-48"
						>
							<div className="rounded-full bg-linear-to-br from-bn-red/55 to-white/5 p-1 shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
								<ImageWithFallback
									src={teamB ? `${serverApi}/${teamB.teamImage[0]}` : null}
									alt={teamB?.teamNick ?? 'Team B'}
									className="h-20 w-20 rounded-full border-[3px] border-bn-surface sm:h-32 sm:w-32"
								/>
							</div>
							<span className="font-display text-sm font-bold text-bn-white transition-colors group-hover:text-bn-red-light sm:text-xl">
								{teamB?.teamNick ?? 'TBD'}
							</span>
						</Link>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-3">
						<span className="rounded-lg border border-bn-border bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-bn-muted">
							{gameDate.toLocaleDateString(undefined, {
								weekday: 'long',
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
						</span>
						<span className="rounded-lg border border-bn-border bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-bn-muted">
							{gameDate.toLocaleTimeString(undefined, {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
						<span className="rounded-lg border border-bn-border bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-bn-muted">
							{chosenGame.gameAddress}
						</span>
					</div>
				</Container>
			</section>

			<Container className="pt-16">
				<SectionHeader eyebrow="Game day" title="What to expect" />
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{GAMEDAY_STEPS.map((step) => (
						<Card
							key={step.number}
							className="p-6 transition-all hover:-translate-y-1 hover:border-bn-red/40"
						>
							<span className="font-display text-3xl font-extrabold text-bn-red">
								{step.number}
							</span>
							<p className="mt-2.5 font-display text-[15px] font-bold text-bn-white">
								{step.title}
							</p>
							<p className="mt-1.5 text-[13px] leading-relaxed text-bn-muted">
								{step.desc}
							</p>
						</Card>
					))}
				</div>
			</Container>

			<Container className="py-16">
				<SectionHeader eyebrow="How baseball works" title="The basics" />
				<div className="grid gap-5 sm:grid-cols-3">
					{BASEBALL_BASICS.map((item) => (
						<Card
							key={item.label + item.value}
							className="p-7 text-center transition-all hover:-translate-y-1 hover:border-bn-red/40"
						>
							<p className="font-display text-4xl font-extrabold text-bn-red">
								{item.value}
							</p>
							<p className="mt-1 font-display text-[13px] font-bold uppercase tracking-wide text-bn-white">
								{item.label}
							</p>
							<p className="mt-2.5 text-[13px] leading-relaxed text-bn-muted">
								{item.desc}
							</p>
						</Card>
					))}
				</div>
			</Container>
		</div>
	);
}
