import axios from 'axios';
import { serverApi } from '../../lib/config';
import type {
	Product,
	ProductInquiry,
	Products,
} from '../../lib/types/product';
import type { OrdinaryInquiry } from '../../lib/types/common';

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

	public async getProduct(productId: string): Promise<Product> {
		try {
			const url = `${this.path}/product/${productId}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}
	public async getVisitedProducts(inquiry: OrdinaryInquiry): Promise<Products> {
		try {
			const { page, limit } = inquiry;
			const url = `${this.path}/product/visited?page=${page}&limit=${limit}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data;
		} catch (err) {
			throw err;
		}
	}
}

export default ProductService;
