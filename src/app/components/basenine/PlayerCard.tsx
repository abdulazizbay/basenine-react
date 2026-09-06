import { Link } from "react-router-dom";
import type { Player } from "../../../lib/types/player";
import { serverApi } from "../../../lib/config";
import { teamOf } from "../../../lib/utils/relations";
import { POSITION_INFO } from "../../../lib/data/playerPositions";
import Card from "../ui/Card";
import ImageWithFallback from "../ui/ImageWithFallback";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const team = teamOf(player.teamId);

  return (
    <Link to={`/players/${player._id}`} className="group block">
      <Card className="overflow-hidden transition-all group-hover:-translate-y-1.5 group-hover:border-bn-red/45 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
        <div className="relative h-52 overflow-hidden bg-bn-surface-2 sm:h-60">
          <ImageWithFallback
            src={`${serverApi}/${player.playerImages[0]}`}
            alt={player.playerNick}
            className="h-full w-full transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-bn-bg/65 px-2.5 py-1 text-[10px] font-bold text-bn-white backdrop-blur-sm">
            {POSITION_INFO[player.playerPosition]?.abbr ?? player.playerPosition}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-4.5">
          <p className="font-display text-base font-bold text-bn-white">
            {player.playerNick}
          </p>
          <p className="text-xs text-bn-muted">{team?.teamNick ?? "Free Agent"}</p>
          <p className="mt-1.5 text-xs font-semibold text-white/55">
            {player.playerViews.toLocaleString()} views
          </p>
        </div>
      </Card>
    </Link>
  );
}
