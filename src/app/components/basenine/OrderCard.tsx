import type { ReactNode } from 'react';
import type { Order, OrderItem } from '../../../lib/types/order';
import type { Product } from '../../../lib/types/product';
import { OrderStatus } from '../../../lib/enums/order.enum';
import Card from '../ui/Card';
import ImageWithFallback from '../ui/ImageWithFallback';

const STATUS_LABEL: Record<OrderStatus, string> = {
	[OrderStatus.PAUSE]: 'Pending Payment',
	[OrderStatus.PROCESS]: 'Processing',
	[OrderStatus.FINISH]: 'Delivered',
	[OrderStatus.DELETE]: 'Cancelled',
};

interface OrderCardProps {
	order: Order;
	actions?: ReactNode;
	onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export default function OrderCard({
	order,
	actions,
	onStatusChange,
}: OrderCardProps) {
	return (
		<Card className="p-5">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-semibold text-bn-white">
						Order #{order._id.slice(-8).toUpperCase()}
					</p>
					<p className="text-xs text-bn-muted">
						{new Date(order.createdAt).toLocaleDateString(undefined, {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</p>
				</div>
				<span className="rounded-full border border-bn-border px-3 py-1 text-xs font-medium text-bn-muted">
					{STATUS_LABEL[order.orderStatus] ?? order.orderStatus}
				</span>
			</div>

			<div className="mt-4 flex flex-col gap-3 border-t border-bn-border pt-4">
				{order.orderItems.map((item: OrderItem) => {
					const product: Product | undefined = order.productData.find(
						(p) => p._id === item.productId,
					);
					return (
						<div key={item._id} className="flex items-center gap-3">
							<ImageWithFallback
								src={product?.productImages[0]}
								alt={product?.productName ?? 'Product'}
								className="h-12 w-12 shrink-0 rounded-lg"
							/>
							<span className="flex-1 text-sm text-bn-white">
								{product?.productName ?? 'Unavailable product'}
							</span>
							<span className="text-xs text-bn-muted">
								x{item.itemQuantity}
							</span>
							<span className="text-sm text-bn-white">
								${(item.itemPrice * item.itemQuantity).toFixed(2)}
							</span>
						</div>
					);
				})}
			</div>

			<div className="mt-4 flex items-center justify-between border-t border-bn-border pt-4">
				<div className="text-xs text-bn-muted">
					<p>Subtotal ${(order.orderTotal - order.orderDelivery).toFixed(2)}</p>
					<p>
						Delivery{' '}
						{order.orderDelivery === 0
							? 'Free'
							: `$${order.orderDelivery.toFixed(2)}`}
					</p>
					<p className="mt-1 text-sm font-semibold text-bn-white">
						Total ${order.orderTotal.toFixed(2)}
					</p>
				</div>
				{order.orderStatus === OrderStatus.PAUSE && (
					<button
						onClick={() => onStatusChange(order._id, OrderStatus.PROCESS)}
					>
						Process
					</button>
				)}
				{order.orderStatus === OrderStatus.PROCESS && (
					<button onClick={() => onStatusChange(order._id, OrderStatus.FINISH)}>
						Finish
					</button>
				)}

				{actions && <div className="flex gap-2">{actions}</div>}
			</div>
		</Card>
	);
}
