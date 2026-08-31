	import ProductCard from "../../components/basenine/ProductCard";
	import type { Product, ProductInquiry } from "../../../lib/types/product";
	import { ProductOrder } from "../../../lib/enums/product.enum";
	import { Direction } from "../../../lib/types/common";

	interface ProductsGridProps {
		products: Product[];
		setProductSearch: React.Dispatch<React.SetStateAction<ProductInquiry>>;
	}

	export default function ProductsGrid({ products, setProductSearch }: ProductsGridProps) {
		return (
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<input
					onChange={(e) =>
						setProductSearch((prev) => ({
							...prev,
							search: e.target.value,
							page: 1,
						}))
					}
				/>
				sort by:
				<select
					onChange={(e) => {
						setProductSearch((prev) => ({
							...prev,
							order: e.target.value as ProductOrder,
							page: 1,
						}));
					}}
				>
					<option value={ProductOrder.CREATED_AT}>Newest</option>
					<option value={ProductOrder.VIEWS}>Most Viewed</option>
					<option value={ProductOrder.PRICE}>Price</option>
				</select>
				<select
					onChange={(e) => {
						setProductSearch((prev) => ({
							...prev,
							page: 1,
							direction: Number(e.target.value) as Direction,
						}));
					}}
				>
					<option value={Direction.ASC}>ASC</option>
					<option value={Direction.DESC}>DESC</option>
				</select>
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		);
	}
