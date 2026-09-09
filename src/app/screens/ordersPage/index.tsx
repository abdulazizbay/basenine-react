import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import EmptyState from '../../components/ui/EmptyState';
import Pagination from '../../components/ui/Pagination';
import OrderCard from '../../components/basenine/OrderCard';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import OrderService from '../../services/OrderService';
import type { Orders } from '../../../lib/types/order';
import { OrderStatus } from '../../../lib/enums/order.enum';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../lib/utils/error';

const TABS: { label: string; status: OrderStatus }[] = [
	{ label: 'Pending', status: OrderStatus.PAUSE },
	{ label: 'Processing', status: OrderStatus.PROCESS },
	{ label: 'Delivered', status: OrderStatus.FINISH },
];

const LIMIT = 5;

export default function OrdersPage() {
	const { authMember } = useAuth();
	const [orders, setOrders] = useState<Orders | null>(null);
	const [orderTotal, setOrderTotal] = useState<number>(0);
	const [activeStatus, setActiveStatus] = useState<OrderStatus>(
		OrderStatus.PAUSE,
	);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		if (!authMember) return;
		const fetchOrders = async () => {
			try {
				const orderService = new OrderService();
				const result: Orders = await orderService.getOrders({
					orderStatus: activeStatus,
					page,
					limit: LIMIT,
				});
				setOrders(result);
				setOrderTotal(result.metaCounter[0]?.total ?? 0);
			} catch (err) {
				toast.error(getErrorMessage(err, 'Could not load your orders.'));
			}
		};
		fetchOrders();
	}, [activeStatus, page, authMember]);

	if (!authMember) return <Navigate to="/" replace />;

	const handleTabChange = (status: OrderStatus) => {
		setActiveStatus(status);
		setPage(1);
	};

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const pageCount = Math.max(1, Math.ceil(orderTotal / LIMIT));

	const handleStatusChange = async (orderId: string, status: OrderStatus) => {
		try {
			const orderService = new OrderService();
			await orderService.updateOrder({ orderId, orderStatus: status });
			setActiveStatus(status);
		} catch (err) {
			toast.error(getErrorMessage(err, 'Could not update this order.'));
		}
	};

	return (
		<Container className="pb-16 pt-32 sm:pt-40">
			<SectionHeader eyebrow="My account" title="Orders" />

			<div className="mb-6 flex gap-2">
				{TABS.map((tab) => (
					<button
						key={tab.status}
						onClick={() => handleTabChange(tab.status)}
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

			{orderTotal > LIMIT && (
				<Pagination
					page={page}
					count={pageCount}
					onChange={handlePageChange}
				/>
			)}
		</Container>
	);
}
