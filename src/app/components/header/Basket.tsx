import Button from '../ui/Button';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';
import CartIcon from './BasketIcon';
import { useCart } from '../../hooks/useCart';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../services/OrderService';
import { serverApi } from '../../../lib/config';
import { getErrorMessage } from '../../../lib/utils/error';

export default function Basket() {
	const { cartItems, onDelete, onDeleteAll, onRemove, onAdd } = useCart();
	const navigate = useNavigate();
	const itemsPrice = cartItems.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0,
	);
	const shippingCost = itemsPrice < 100 ? 5 : 0;
	const totalPrice = itemsPrice + shippingCost;

	const proceedOrderHanlder = async () => {
		try {
			const orderService = new OrderService();
			await orderService.createOrder(cartItems);

			onDeleteAll();
			navigate('/orders');
			toast.success('Order placed.');
		} catch (err) {
			toast.error(getErrorMessage(err, 'Could not place your order.'));
		}
	};

	return (
		<Card className="absolute right-0 top-full z-30 mt-3.5 w-[380px] max-w-[calc(100vw-2rem)] overflow-visible p-4.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
			<span className="absolute -top-[5px] right-[18px] h-2.5 w-2.5 rotate-45 border-l border-t border-bn-border bg-bn-surface" />

			<div className="flex items-center justify-between">
				<span className="font-display text-[15px] font-bold text-bn-white">
					Your Cart
				</span>
				{cartItems.length !== 0 && (
					<button
						onClick={() => onDeleteAll()}
						className="text-[11px] font-semibold text-bn-muted transition-colors hover:text-bn-red"
					>
						Clear
					</button>
				)}
			</div>

			{cartItems.length !== 0 ? (
				<>
					<div className="mt-3.5 flex max-h-80 flex-col gap-3 overflow-y-auto pr-1">
						{cartItems.map((item) => (
							<div
								key={item._id}
								className="flex items-center gap-3 rounded-xl border border-bn-border bg-bn-bg p-2.5"
							>
								<ImageWithFallback
									src={`${serverApi}/${item.image}`}
									alt={item.name}
									className="h-12 w-12 shrink-0 rounded-lg"
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate text-[13px] font-semibold text-bn-white">
										{item.name}
									</p>
									<p className="text-xs text-bn-muted">
										${item.price.toFixed(2)}
									</p>
								</div>
								<div className="flex shrink-0 items-center gap-1.5">
									<button
										onClick={() => onRemove(item)}
										className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-bn-border bg-bn-surface-2 text-xs text-bn-white transition-colors hover:border-bn-red/50"
									>
										-
									</button>
									<span className="min-w-4 text-center text-[13px] font-semibold text-bn-white">
										{item.quantity}
									</span>
									<button
										onClick={() => onAdd(item)}
										className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-bn-border bg-bn-surface-2 text-xs text-bn-white transition-colors hover:border-bn-red/50"
									>
										+
									</button>
								</div>
								<button
									onClick={() => onDelete(item)}
									className="shrink-0 p-0.5 text-bn-muted transition-colors hover:text-bn-red"
								>
									&times;
								</button>
							</div>
						))}
					</div>

					<div className="mt-3.5 flex flex-col gap-2 border-t border-bn-border pt-3.5">
						<div className="flex justify-between text-[13px] text-bn-muted">
							<span>Subtotal</span>
							<span>${itemsPrice.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-[13px] text-bn-muted">
							<span>Shipping</span>
							<span>
								{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
							</span>
						</div>
						<div className="mt-1 flex justify-between font-display text-base font-extrabold text-bn-white">
							<span>Total</span>
							<span>${totalPrice.toFixed(2)}</span>
						</div>
					</div>

					<Button onClick={proceedOrderHanlder} className="mt-2.5 w-full">
						<CartIcon className="h-[18px] w-[18px]" />
						Checkout
					</Button>
				</>
			) : (
				<div className="flex flex-col items-center gap-1.5 py-7 text-center">
					<CartIcon className="mb-1 h-8 w-8 text-white/15" />
					<span className="text-sm font-semibold text-bn-white">
						Your cart is empty
					</span>
					<p className="text-xs text-bn-muted">
						Browse the shop and add some gear.
					</p>
				</div>
			)}
		</Card>
	);
}
