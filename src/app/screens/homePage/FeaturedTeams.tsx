import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import TeamCard from "../../components/basenine/TeamCard";
import type { Team } from "../../../lib/types/team";

interface FeaturedTeamsProps {
  teams: Team[];
}

export default function FeaturedTeams({ teams }: FeaturedTeamsProps) {
  return (
    <Container className="py-16">
      <SectionHeader
        eyebrow="Fan favorites"
        title="Popular Teams"
        action={{ label: "View all", to: "/teams" }}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <TeamCard key={team._id} team={team} />
        ))}
      </div>
    </Container>
  );
}
