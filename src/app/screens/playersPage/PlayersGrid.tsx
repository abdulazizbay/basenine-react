import PlayerCard from "../../components/basenine/PlayerCard";
import type { Player } from "../../../lib/types/player";

interface PlayersGridProps {
  players: Player[];
}

export default function PlayersGrid({ players }: PlayersGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
}
