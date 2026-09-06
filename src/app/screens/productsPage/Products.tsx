import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import Pagination from "../../components/ui/Pagination";
import ProductsGrid from "./ProductsGrid";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductOrder } from "../../../lib/enums/product.enum";
import { Direction } from "../../../lib/types/common";
import type { Product, ProductInquiry } from "../../../lib/types/product";

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [productTotal, setProductTotal] = useState<number>(0);
	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		order: ProductOrder.CREATED_AT,
		direction: Direction.DESC,
		limit: 8,
		page: 1,
	});

	useEffect(() => {
		const productService = new ProductService();
		productService
			.getProducts(productSearch)
			.then((data) => {
				setProducts(data.list);
				setProductTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) => console.log(err));
	}, [productSearch]);

	const handlePageChange = (page: number) => {
		setProductSearch((prev) => ({ ...prev, page }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const pageCount = Math.max(1, Math.ceil(productTotal / productSearch.limit));

	return (
		<div>
			<section className="bg-linear-to-b from-bn-surface to-bn-bg pb-8 pt-32 sm:pt-40">
				<Container>
					<SectionHeader eyebrow="Team store" title="Shop" />
					<p className="-mt-6 max-w-lg text-sm text-bn-muted">
						Official gear from every team in the league — jerseys, caps, and
						everything in between.
					</p>
				</Container>
			</section>

			<Container className="py-12">
				<p className="mb-4 text-xs text-bn-muted">
					{productTotal} products found
				</p>
				<ProductsGrid
					products={products}
					productSearch={productSearch}
					setProductSearch={setProductSearch}
				/>
				{productTotal > productSearch.limit && (
					<Pagination
						page={productSearch.page}
						count={pageCount}
						onChange={handlePageChange}
					/>
				)}
			</Container>
		</div>
	);
}
