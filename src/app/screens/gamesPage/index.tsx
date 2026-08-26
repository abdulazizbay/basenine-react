import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import EmptyState from "../../components/ui/EmptyState";

export default function GamesPage() {
  return (
    <Container className="py-16">
      <SectionHeader eyebrow="Schedule" title="Games" />
      <EmptyState
        title="No games scheduled yet"
        description="Upcoming and past games will appear here."
      />
    </Container>
  );
}
