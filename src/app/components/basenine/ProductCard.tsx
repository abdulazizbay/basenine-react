import type { Product } from '../../../lib/types/product';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const outOfStock = product.productLeftCount <= 0;

	return (
		<Card className="overflow-hidden">
			<ImageWithFallback
				src={product.productImages[0]}
				alt={product.productName}
				className="h-40 w-full"
			/>
			<div className="p-4">
				<p className="text-[11px] uppercase tracking-wide text-bn-muted">
					{product.productCollection}
				</p>
				<p className="mt-1 font-display text-base font-semibold text-bn-white">
					{product.productName}
				</p>
				<div className="mt-3 flex items-center justify-between">
					<span className="text-sm font-semibold text-bn-white">
						${product.productPrice.toFixed(2)}
					</span>
					<span
						className={`text-xs font-medium ${outOfStock ? 'text-bn-red' : 'text-bn-muted'}`}
					>
						{outOfStock ? 'Sold out' : `${product.productLeftCount} left`}
					</span>
					<div>Add to cart</div>
				</div>
			</div>
		</Card>
	);
}
