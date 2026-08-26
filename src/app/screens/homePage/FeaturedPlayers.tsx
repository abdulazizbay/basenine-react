import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import PlayerCard from "../../components/basenine/PlayerCard";
import type { Player } from "../../../lib/types/player";

interface FeaturedPlayersProps {
  players: Player[];
}

export default function FeaturedPlayers({ players }: FeaturedPlayersProps) {
  return (
    <Container className="pb-16">
      <SectionHeader
        eyebrow="The roster"
        title="Popular Players"
        action={{ label: "View all", to: "/players" }}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </Container>
  );
}
