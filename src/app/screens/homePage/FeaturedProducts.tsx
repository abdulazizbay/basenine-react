import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import ProductCard from "../../components/basenine/ProductCard";
import type { Product } from "../../../lib/types/product";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <Container className="pb-20">
      <SectionHeader
        eyebrow="Shop"
        title="Featured Gear"
        action={{ label: "View all", to: "/products" }}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
}
