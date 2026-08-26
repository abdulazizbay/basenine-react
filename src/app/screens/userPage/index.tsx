import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import EmptyState from "../../components/ui/EmptyState";

export default function UsersPage() {
  return (
    <Container className="py-16">
      <SectionHeader eyebrow="My account" title="Profile" />
      <EmptyState
        title="Sign in to view your profile"
        description="Account details and subscribed teams will appear here."
      />
    </Container>
  );
}
