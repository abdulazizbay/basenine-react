import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import OrderCard from '../../components/basenine/OrderCard';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import OrderService from '../../services/OrderService';
import type { Orders } from '../../../lib/types/order';
import { OrderStatus } from '../../../lib/enums/order.enum';
import { useAuth } from '../../hooks/useAuth';

const TABS: { label: string; status: OrderStatus }[] = [
	{ label: 'Pending', status: OrderStatus.PAUSE },
	{ label: 'Processing', status: OrderStatus.PROCESS },
	{ label: 'Delivered', status: OrderStatus.FINISH },
];

export default function OrdersPage() {
	const { authMember } = useAuth();
	const [orders, setOrders] = useState<Orders | null>(null);
	const [activeStatus, setActiveStatus] = useState<OrderStatus>(
		OrderStatus.PAUSE,
	);

	useEffect(() => {
		if (!authMember) return;
		const fetchOrders = async () => {
			try {
				const orderService = new OrderService();
				const result: Orders = await orderService.getOrders({
					orderStatus: activeStatus,
					page: 1,
					limit: 5,
				});
				setOrders(result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchOrders();
	}, [activeStatus, authMember]);

	if (!authMember) return <Navigate to="/" replace />;

	const handleStatusChange = async (orderId: string, status: OrderStatus) => {
		try {
			const orderService = new OrderService();
			await orderService.updateOrder({ orderId, orderStatus: status });
			setActiveStatus(status);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container className="py-16">
			<SectionHeader eyebrow="My account" title="Orders" />

			<div className="mb-6 flex gap-2">
				{TABS.map((tab) => (
					<button
						key={tab.status}
						onClick={() => setActiveStatus(tab.status)}
						className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
							activeStatus === tab.status
								? 'border-bn-red bg-bn-red text-bn-white'
								: 'border-bn-border text-bn-muted hover:text-bn-white'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{orders && orders.list.length !== 0 ? (
				<div className="flex flex-col gap-4">
					{orders.list.map((order) => (
						<OrderCard
							key={order._id}
							order={order}
							onStatusChange={handleStatusChange}
						/>
					))}
				</div>
			) : (
				<EmptyState
					title={`No ${TABS.find((tab) => tab.status === activeStatus)?.label.toLowerCase()} orders`}
					description="Your order history will appear here once you've checked out."
				/>
			)}
		</Container>
	);
}
