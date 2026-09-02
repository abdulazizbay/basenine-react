import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
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
		direction: Direction.ASC,
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

	return (
		<Container className="py-16">
			<SectionHeader eyebrow="Shop" title="Products" />
			<p className="mb-4 text-xs text-bn-muted">{productTotal} products found</p>
			<ProductsGrid products={products} setProductSearch={setProductSearch} />
		</Container>
	);
}
