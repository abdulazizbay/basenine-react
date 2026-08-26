import PlayerCard from "../../components/basenine/PlayerCard";
import type { Player, PlayerInquiry } from "../../../lib/types/player";
import { PlayerOrder } from "../../../lib/enums/player.enum";
import { Direction } from "../../../lib/types/common";

interface PlayersGridProps {
	players: Player[];
	setPlayerSearch: React.Dispatch<React.SetStateAction<PlayerInquiry>>;
}

export default function PlayersGrid({ players, setPlayerSearch }: PlayersGridProps) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<input
				onChange={(e) =>
					setPlayerSearch((prev) => ({
						...prev,
						search: e.target.value,
						page: 1,
					}))
				}
			/>
			sort by:
			<select
				onChange={(e) => {
					setPlayerSearch((prev) => ({
						...prev,
						order: e.target.value as PlayerOrder,
						page: 1,
					}));
				}}
			>
				<option value={PlayerOrder.CREATED_AT}>Newest</option>
				<option value={PlayerOrder.VIEWS}>Most Viewed</option>
			</select>
			<select
				onChange={(e) => {
					setPlayerSearch((prev) => ({
						...prev,
						page: 1,
						direction: Number(e.target.value) as Direction,
					}));
				}}
			>
				<option value={Direction.ASC}>ASC</option>
				<option value={Direction.DESC}>DESC</option>
			</select>
			{players.map((player) => (
				<PlayerCard key={player._id} player={player} />
			))}
		</div>
	);
}
