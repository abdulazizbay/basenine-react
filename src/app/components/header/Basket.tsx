import Button from '../ui/Button';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface BasketProps {
	onClose: () => void;
}

export default function Basket({ onClose }: BasketProps) {
	const { cartItems, onDelete, onDeleteAll, onRemove, onAdd } = useCart();
	const navigate = useNavigate();
	const itemsPrice = cartItems.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0,
	);
	const shippingCost = itemsPrice < 100 ? 5 : 0;
	const totalPrice = itemsPrice + shippingCost;

	return (
		<Card className="absolute right-0 top-full z-30 mt-3 w-80 overflow-hidden p-4 shadow-xl">
			<div className="flex items-center justify-between">
				<span className="font-display text-sm font-semibold text-bn-white">
					Your Cart
				</span>
				<button
					onClick={onClose}
					className="text-xs text-bn-muted transition-colors hover:text-bn-white"
				>
					Close
				</button>
			</div>

			<div className="mt-4 flex flex-col gap-4">
				{cartItems.map((item) => (
					<div key={item._id} className="flex items-center gap-3">
						<ImageWithFallback
							src={item.name}
							alt={item.name}
							className="h-14 w-14 shrink-0 rounded-lg"
						/>
						<div className="flex-1">
							<p className="text-sm font-medium text-bn-white">{item.name}</p>
							<p className="text-xs text-bn-muted">${item.price.toFixed(2)}</p>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => onRemove(item)}
								className="flex h-6 w-6 items-center justify-center rounded-full border border-bn-border text-xs text-bn-muted transition-colors hover:text-bn-white"
							>
								-
							</button>
							<span className="w-4 text-center text-xs text-bn-white">
								{item.quantity}
							</span>
							<button
								onClick={() => onAdd(item)}
								className="flex h-6 w-6 items-center justify-center rounded-full border border-bn-border text-xs text-bn-muted transition-colors hover:text-bn-white"
							>
								+
							</button>
						</div>
						<button
							onClick={() => onDelete(item)}
							className="text-bn-muted transition-colors hover:text-bn-red"
						>
							×
						</button>
					</div>
				))}
				<button onClick={() => onDeleteAll()}>Delete all </button>
			</div>

			<div className="mt-4 space-y-1 border-t border-bn-border pt-3 text-xs text-bn-muted">
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span>${itemsPrice.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span>Shipping</span>
					<span>
						{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
					</span>
				</div>
				<div className="flex justify-between pt-1 text-sm font-semibold text-bn-white">
					<span>Total</span>
					<span>${totalPrice.toFixed(2)}</span>
				</div>
			</div>

			<Button onClick={() => navigate('/orders')} className="mt-4 w-full">
				Checkout
			</Button>
		</Card>
	);
}
