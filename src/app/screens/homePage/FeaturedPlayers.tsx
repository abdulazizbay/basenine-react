import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import ImageWithFallback from "../../components/ui/ImageWithFallback";
import { serverApi } from "../../../lib/config";
import { teamOf } from "../../../lib/utils/relations";
import type { Player } from "../../../lib/types/player";

interface FeaturedPlayersProps {
  players: Player[];
}

const POSITION_LABEL: Record<string, string> = {
  PITCHER: "Pitcher",
  CATCHER: "Catcher",
  BASEMAN1: "1st Base",
  BASEMAN2: "2nd Base",
  BASEMAN3: "3rd Base",
  SHORTSTOP: "Shortstop",
  LEFTFIELDER: "Left Field",
  CENTERFIELDER: "Center Field",
  RIGHTFIELDER: "Right Field",
};

export default function FeaturedPlayers({ players }: FeaturedPlayersProps) {
  return (
    <section className="bg-bn-bg py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Player spotlight"
          title="Popular Players"
          action={{ label: "View all", to: "/players" }}
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {players.map((player) => {
            const team = teamOf(player.teamId);
            return (
              <Link key={player._id} to={`/players/${player._id}`} className="group block">
                <div className="relative h-56 overflow-hidden rounded-2xl border border-bn-border bg-bn-surface-2 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all group-hover:-translate-y-2 group-hover:border-bn-red/50 sm:h-80">
                  <ImageWithFallback
                    src={`${serverApi}/${player.playerImages[0]}`}
                    alt={player.playerNick}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bn-bg via-bn-bg/50 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-bn-bg/60 px-2.5 py-1 text-[10px] font-bold text-bn-white backdrop-blur-sm">
                    {POSITION_LABEL[player.playerPosition] ?? player.playerPosition}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
                    <span className="font-display text-[11px] font-bold tracking-wide text-bn-red">
                      #{player.playerNumber}
                    </span>
                    <span className="font-display text-base font-bold text-bn-white sm:text-lg">
                      {player.playerNick}
                    </span>
                    <span className="text-xs text-bn-muted">
                      {team?.teamNick ?? "Free Agent"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
