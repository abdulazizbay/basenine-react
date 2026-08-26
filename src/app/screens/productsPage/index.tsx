import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import ProductsGrid from "./ProductsGrid";
import { mockProducts } from "../../../lib/mocks/products.mock";

export default function ProductsPage() {
  return (
    <Container className="py-16">
      <SectionHeader eyebrow="Shop" title="Products" />
      <ProductsGrid products={mockProducts} />
    </Container>
  );
}
