import axios from 'axios';
import { serverApi } from '../../lib/config';
import type { ProductInquiry, Products } from '../../lib/types/product';

class ProductService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async getProducts(inquiry: ProductInquiry): Promise<Products> {
		try {
			let url = `${this.path}/product/all?order=${inquiry.order}&direction=${inquiry.direction}&limit=${inquiry.limit}&page=${inquiry.page}`;

			if (inquiry.search) url += `&search=${inquiry.search}`;
			if (inquiry.productCollection)
				url += `&productCollection=${inquiry.productCollection}`;
			if (inquiry.teamId) url += `&teamId=${inquiry.teamId}`;

			const result = await axios.get(url);
			return result.data;
		} catch (err) {
			throw err;
		}
	}
}

export default ProductService;
