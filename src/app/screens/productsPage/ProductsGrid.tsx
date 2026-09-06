import ProductCard from "../../components/basenine/ProductCard";
import EmptyState from "../../components/ui/EmptyState";
import type { Product, ProductInquiry } from "../../../lib/types/product";
import { ProductCollection, ProductOrder } from "../../../lib/enums/product.enum";
import { Direction } from "../../../lib/types/common";

interface ProductsGridProps {
	products: Product[];
	productSearch: ProductInquiry;
	setProductSearch: React.Dispatch<React.SetStateAction<ProductInquiry>>;
}

const SORT_OPTIONS: { label: string; value: ProductOrder }[] = [
	{ label: "Newest", value: ProductOrder.CREATED_AT },
	{ label: "Price", value: ProductOrder.PRICE },
	{ label: "Most Viewed", value: ProductOrder.VIEWS },
];

const COLLECTION_OPTIONS: { label: string; value?: ProductCollection }[] = [
	{ label: "All", value: undefined },
	{ label: "Jerseys", value: ProductCollection.JERSEYS },
	{ label: "Shoes", value: ProductCollection.SHOES },
	{ label: "Balls", value: ProductCollection.BALLS },
	{ label: "Bags", value: ProductCollection.BAGS },
	{ label: "Caps", value: ProductCollection.CAPS },
	{ label: "Socks", value: ProductCollection.SOCKS },
	{ label: "Water Bottles", value: ProductCollection.WATER_BOTTLES },
	{ label: "Other", value: ProductCollection.OTHER },
];

export default function ProductsGrid({
	products,
	productSearch,
	setProductSearch,
}: ProductsGridProps) {
	return (
		<div>
			<div className="mb-4 flex flex-wrap items-center justify-between gap-4">
				<div className="flex h-11 items-center gap-2.5 rounded-lg border border-bn-border bg-white/[0.025] px-4 transition-colors focus-within:border-bn-red/50">
					<input
						placeholder="Search products..."
						onChange={(e) =>
							setProductSearch((prev) => ({
								...prev,
								search: e.target.value,
								page: 1,
							}))
						}
						className="w-40 bg-transparent text-[13px] text-bn-white outline-none placeholder:text-bn-muted/60 sm:w-52"
					/>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					{SORT_OPTIONS.map((opt) => (
						<button
							key={opt.value}
							onClick={() =>
								setProductSearch((prev) => ({
									...prev,
									order: opt.value,
									page: 1,
								}))
							}
							className={`h-10 rounded-lg border px-3.5 text-xs font-semibold transition-colors ${
								productSearch.order === opt.value
									? "border-bn-red bg-bn-red/10 text-bn-white"
									: "border-bn-border text-bn-muted hover:text-bn-white"
							}`}
						>
							{opt.label}
						</button>
					))}
					<button
						onClick={() =>
							setProductSearch((prev) => ({
								...prev,
								page: 1,
								direction:
									prev.direction === Direction.DESC
										? Direction.ASC
										: Direction.DESC,
							}))
						}
						className="h-10 rounded-lg border border-bn-border bg-bn-surface-2 px-3.5 text-[11px] font-bold tracking-wide text-bn-white transition-colors hover:border-bn-red/50"
					>
						{productSearch.direction === Direction.DESC ? "DESC" : "ASC"}
					</button>
				</div>
			</div>

			<div className="mb-8 flex flex-wrap gap-2">
				{COLLECTION_OPTIONS.map((opt) => (
					<button
						key={opt.label}
						onClick={() =>
							setProductSearch((prev) => ({
								...prev,
								productCollection: opt.value,
								page: 1,
							}))
						}
						className={`h-9 rounded-lg border px-3 text-xs font-semibold transition-colors ${
							productSearch.productCollection === opt.value
								? "border-bn-red bg-bn-red/10 text-bn-white"
								: "border-bn-border text-bn-muted hover:text-bn-white"
						}`}
					>
						{opt.label}
					</button>
				))}
			</div>

			{products.length !== 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			) : (
				<EmptyState title="No products match these filters" />
			)}
		</div>
	);
}
