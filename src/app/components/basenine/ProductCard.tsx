import { Link } from 'react-router-dom';
import type { Product } from '../../../lib/types/product';
import { useCart } from '../../hooks/useCart';
import { serverApi } from '../../../lib/config';
import { teamOf } from '../../../lib/utils/relations';
import CartIcon from '../header/BasketIcon';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const { onAdd } = useCart();
	const outOfStock = product.productLeftCount <= 0;
	const team = teamOf(product.teamId);

	return (
		<Link to={`/products/${product._id}`} className="group block">
			<Card className="overflow-hidden transition-all group-hover:-translate-y-1.5 group-hover:border-bn-red/45 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
				<div className="relative h-44 overflow-hidden bg-bn-surface-2 sm:h-52">
					<ImageWithFallback
						src={`${serverApi}/${product.productImages[0]}`}
						alt={product.productName}
						className="h-full w-full transition-transform duration-500 group-hover:scale-110"
					/>
					<span className="absolute left-3 top-3 rounded-md border border-white/15 bg-bn-bg/70 px-2 py-1 text-[10px] font-bold tracking-wide text-bn-white backdrop-blur-sm">
						{product.productCollection}
					</span>
					<button
						disabled={outOfStock}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							onAdd({
								_id: product._id,
								quantity: 1,
								name: product.productName,
								price: product.productPrice,
								image: product.productImages[0],
							});
						}}
						className="absolute right-3 top-3 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-bn-red text-white shadow-[0_10px_25px_rgba(229,72,77,0.45)] transition-all hover:scale-110 hover:bg-bn-red-light disabled:cursor-not-allowed disabled:bg-bn-surface-2 disabled:text-bn-muted disabled:shadow-none"
					>
						<CartIcon className="h-4 w-4" />
					</button>
					{outOfStock && (
						<div className="absolute inset-0 flex items-center justify-center bg-bn-bg/60">
							<span className="text-xs font-bold uppercase tracking-wide text-bn-white">
								Sold Out
							</span>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-1 p-4.5">
					<span
						className={`text-[11px] font-semibold uppercase tracking-wide text-bn-muted ${
							team ? '' : 'invisible'
						}`}
					>
						{team?.teamNick ?? 'placeholder'}
					</span>
					<span className="line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold text-bn-white">
						{product.productName}
					</span>
					<div className="mt-1 flex items-center justify-between">
						<span className="font-display text-base font-extrabold text-bn-red">
							${product.productPrice.toFixed(2)}
						</span>
						<span className="text-xs font-semibold text-white/55">
							{product.productViews.toLocaleString()} views
						</span>
					</div>
				</div>
			</Card>
		</Link>
	);
}
