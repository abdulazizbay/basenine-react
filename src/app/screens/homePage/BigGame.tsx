import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import ImageWithFallback from "../../components/ui/ImageWithFallback";
import { teamOf } from "../../../lib/utils/relations";
import { serverApi } from "../../../lib/config";
import type { Game } from "../../../lib/types/game";

interface BigGameProps {
  game: Game | null;
}

export default function BigGame({ game }: BigGameProps) {
  if (!game) return null;

  const teamA = teamOf(game.teamAId);
  const teamB = teamOf(game.teamBId);
  const gameDate = new Date(game.gameDate);

  return (
    <section className="bg-bn-bg py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-bn-border bg-[radial-gradient(circle_at_14%_12%,rgba(229,72,77,0.12),transparent_40%),radial-gradient(circle_at_88%_88%,rgba(255,255,255,0.03),transparent_40%)] bg-bn-surface px-6 py-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:px-16 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-[40%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bn-red/10 blur-[70px]" />

          <p className="relative z-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-bn-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bn-red" />
            Featured matchup
          </p>

          <div className="relative z-10 mt-9 flex items-center justify-center gap-6 sm:gap-14">
            <div className="flex w-28 flex-col items-center gap-4 sm:w-48">
              <div className="rounded-full bg-linear-to-br from-bn-red/55 to-white/5 p-1 shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
                <ImageWithFallback
                  src={teamA ? `${serverApi}/${teamA.teamImage[0]}` : null}
                  alt={teamA?.teamNick ?? "Team A"}
                  className="h-20 w-20 rounded-full border-[3px] border-bn-surface sm:h-32 sm:w-32"
                />
              </div>
              <span className="font-display text-sm font-bold text-bn-white sm:text-xl">
                {teamA?.teamNick ?? "TBD"}
              </span>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bn-red shadow-[0_0_0_8px_rgba(229,72,77,0.08),0_15px_35px_rgba(229,72,77,0.4)] sm:h-16 sm:w-16">
              <span className="font-display text-xs font-extrabold tracking-wide text-white sm:text-sm">
                VS
              </span>
            </div>

            <div className="flex w-28 flex-col items-center gap-4 sm:w-48">
              <div className="rounded-full bg-linear-to-br from-bn-red/55 to-white/5 p-1 shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
                <ImageWithFallback
                  src={teamB ? `${serverApi}/${teamB.teamImage[0]}` : null}
                  alt={teamB?.teamNick ?? "Team B"}
                  className="h-20 w-20 rounded-full border-[3px] border-bn-surface sm:h-32 sm:w-32"
                />
              </div>
              <span className="font-display text-sm font-bold text-bn-white sm:text-xl">
                {teamB?.teamNick ?? "TBD"}
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-lg border border-bn-border bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-bn-muted">
              {gameDate.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="rounded-lg border border-bn-border bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-bn-muted">
              {gameDate.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {game.gameAddress && (
              <span className="rounded-lg border border-bn-border bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-bn-muted">
                {game.gameAddress}
              </span>
            )}
          </div>

          <Link
            to={`/games/${game._id}`}
            className="relative z-10 mt-9 inline-flex items-center gap-2.5 rounded-xl bg-bn-red px-7 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(229,72,77,0.3)] transition-all hover:-translate-y-0.5 hover:bg-bn-red-light"
          >
            View Game <span>&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
