import axios from 'axios';
import { serverApi } from '../../lib/config';
import type {
	Order,
	OrderInquiry,
	OrderitemInput,
	Orders,
	OrderUpdateInput,
} from '../../lib/types/order';
import type { CartItem } from '../../lib/types/cart';

class OrderService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async getOrders(inquiry: OrderInquiry): Promise<Orders> {
		try {
			let url = `${this.path}/order/all?orderStatus=${inquiry.orderStatus}&limit=${inquiry.limit}&page=${inquiry.page}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data;
		} catch (err) {
			throw err;
		}
	}
	public async createOrder(input: CartItem[]): Promise<Order> {
		try {
			let url = `${this.path}/order/create`;
			const orderItems: OrderitemInput[] = input.map((cartItem: CartItem) => ({
				itemQuantity: cartItem.quantity,
				itemPrice: cartItem.price,
				productId: cartItem._id,
			}));
			const result = await axios.post(url, orderItems, {
				withCredentials: true,
			});
			return result.data;
		} catch (err) {
			throw err;
		}
	}
	public async updateOrder(input: OrderUpdateInput): Promise<Order> {
		try {
			const url = `${this.path}/order/update`;
			const result = await axios.post(url, input, { withCredentials: true });
			return result.data;
		} catch (err) {
			throw err;
		}
	}
}

export default OrderService;
