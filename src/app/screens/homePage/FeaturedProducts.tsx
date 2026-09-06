import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import ImageWithFallback from "../../components/ui/ImageWithFallback";
import CartIcon from "../../components/header/BasketIcon";
import { serverApi } from "../../../lib/config";
import { teamOf } from "../../../lib/utils/relations";
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
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const team = teamOf(product.teamId);
          return (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group block overflow-hidden rounded-2xl border border-bn-border bg-bn-surface transition-all hover:-translate-y-1.5 hover:border-bn-red/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
            >
              <div className="relative h-36 overflow-hidden bg-bn-surface-2 sm:h-44">
                <ImageWithFallback
                  src={`${serverApi}/${product.productImages[0]}`}
                  alt={product.productName}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-2.5 top-2.5 rounded-md border border-white/15 bg-bn-bg/70 px-2 py-1 text-[10px] font-bold tracking-wide text-bn-white backdrop-blur-sm">
                  {product.productCollection}
                </span>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bn-bg/45 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bn-red text-white shadow-[0_10px_30px_rgba(229,72,77,0.5)]">
                    <CartIcon className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 p-4">
                {team && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-bn-muted">
                    {team.teamNick}
                  </span>
                )}
                <span className="line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold text-bn-white">
                  {product.productName}
                </span>
                <span className="mt-0.5 font-display text-base font-extrabold text-bn-red">
                  ${product.productPrice.toFixed(2)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
