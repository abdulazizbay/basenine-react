import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import TeamsGrid from "./TeamsGrid";
import { mockTeams } from "../../../lib/mocks/teams.mock";

export default function TeamsPage() {
  return (
    <Container className="py-16">
      <SectionHeader eyebrow="The league" title="Teams" />
      <TeamsGrid teams={mockTeams} />
    </Container>
  );
}
