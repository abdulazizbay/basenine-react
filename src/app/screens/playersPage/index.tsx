import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import PlayersGrid from "./PlayersGrid";
import { mockPlayers } from "../../../lib/mocks/players.mock";

export default function PlayersPage() {
  return (
    <Container className="py-16">
      <SectionHeader eyebrow="The roster" title="Players" />
      <PlayersGrid players={mockPlayers} />
    </Container>
  );
}
