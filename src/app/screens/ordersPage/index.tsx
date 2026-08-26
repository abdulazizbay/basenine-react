import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import EmptyState from "../../components/ui/EmptyState";

export default function OrdersPage() {
  return (
    <Container className="py-16">
      <SectionHeader eyebrow="My account" title="Orders" />
      <EmptyState
        title="No orders yet"
        description="Your order history will appear here once you've checked out."
      />
    </Container>
  );
}
