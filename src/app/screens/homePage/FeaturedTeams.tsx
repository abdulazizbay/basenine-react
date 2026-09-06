import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import ImageWithFallback from "../../components/ui/ImageWithFallback";
import { serverApi } from "../../../lib/config";
import type { Team } from "../../../lib/types/team";

interface FeaturedTeamsProps {
  teams: Team[];
}

export default function FeaturedTeams({ teams }: FeaturedTeamsProps) {
  return (
    <section className="border-y border-bn-border bg-bn-surface py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Fan favorites"
          title="Popular Teams"
          action={{ label: "View all", to: "/teams" }}
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {teams.map((team) => (
            <Link key={team._id} to={`/teams/${team._id}`} className="group">
              <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-bn-border bg-[radial-gradient(circle_at_50%_30%,rgba(229,72,77,0.14),transparent_55%)] bg-bn-surface-2 transition-all group-hover:-translate-y-2 group-hover:border-bn-red/50 sm:h-52">
                <div className="absolute h-28 w-28 rounded-full border border-dashed border-white/10 sm:h-36 sm:w-36" />
                <ImageWithFallback
                  src={`${serverApi}/${team.teamImage[0]}`}
                  alt={team.teamNick}
                  className="relative z-10 h-20 w-20 rounded-full border-[3px] border-bn-surface shadow-[0_15px_30px_rgba(0,0,0,0.4)] sm:h-24 sm:w-24"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <p className="font-display text-base font-bold text-bn-white sm:text-[17px]">
                  {team.teamNick}
                </p>
                <p className="text-xs text-bn-muted">{team.teamAddress}</p>
                <p className="mt-0.5 text-xs font-semibold text-bn-red-light">
                  {team.teamSubscribers.toLocaleString()} subscribers
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
