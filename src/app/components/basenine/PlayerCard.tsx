import { Link } from "react-router-dom";
import type { Player } from "../../../lib/types/player";
import { serverApi } from "../../../lib/config";
import Card from "../ui/Card";
import ImageWithFallback from "../ui/ImageWithFallback";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link to={`/players/${player._id}`}>
      <Card className="overflow-hidden">
        <ImageWithFallback
          src={`${serverApi}/${player.playerImages[0]}`}
          alt={player.playerNick}
          className="h-40 w-full"
        />
        <div className="p-4">
          <p className="font-display text-base font-semibold text-bn-white">{player.playerNick}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-bn-muted">
            {player.playerPosition} &middot; #{player.playerNumber}
          </p>
          <p className="mt-3 text-xs font-medium text-bn-muted">
            {player.playerViews.toLocaleString()} views
          </p>
        </div>
      </Card>
    </Link>
  );
}
