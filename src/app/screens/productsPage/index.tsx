import { Route, Routes } from 'react-router-dom';
import Products from './Products';
import { ProductDetail } from './ProductDetail';

export default function ProductsPage() {
	return (
		<Routes>
			<Route index element={<Products />} />
			<Route path=":productId" element={<ProductDetail />} />
		</Routes>
	);
}
