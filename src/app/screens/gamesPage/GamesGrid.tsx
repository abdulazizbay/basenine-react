import GameCard from "../../components/basenine/GameCard";
import type { Game, GameInquiry } from "../../../lib/types/game";
import { GameStatus } from "../../../lib/enums/game.enum";

interface GamesGridProps {
	games: Game[];
	setGameSearch: React.Dispatch<React.SetStateAction<GameInquiry>>;
}

export default function GamesGrid({ games, setGameSearch }: GamesGridProps) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			status:
			<select
				onChange={(e) => {
					setGameSearch((prev) => {
						const next = { ...prev, page: 1 };
						if (e.target.value) next.gameStatus = e.target.value as GameStatus;
						else delete next.gameStatus;
						return next;
					});
				}}
			>
				<option value="">All</option>
				<option value={GameStatus.UPCOMING}>Upcoming</option>
				<option value={GameStatus.PROCESS}>In Progress</option>
				<option value={GameStatus.FINISHED}>Finished</option>
			</select>
			{games.map((game) => (
				<GameCard key={game._id} game={game} />
			))}
		</div>
	);
}
