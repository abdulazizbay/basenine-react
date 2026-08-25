import React, { ReactNode } from "react";
import { Box, Stack } from "@mui/material";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { serverApi } from "../../../lib/config";

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.PAUSE]: "Pending Payment",
  [OrderStatus.PROCESS]: "Processing",
  [OrderStatus.FINISH]: "Delivered",
  [OrderStatus.DELETE]: "Cancelled",
};

interface OrderCardProps {
  order: Order;
  actions?: ReactNode;
}

export default function OrderCard({ order, actions }: OrderCardProps) {
  return (
    <Box className="order-card">
      <Stack className="order-card-header" direction="row" justifyContent="space-between">
        <Box className="order-card-id-date">
          <span className="order-card-id">Order #{order._id.slice(-8).toUpperCase()}</span>
          <span className="order-card-date">
            {new Date(order.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </Box>
        <span className={`order-status status-${order.orderStatus.toLowerCase()}`}>
          {STATUS_LABEL[order.orderStatus] ?? order.orderStatus}
        </span>
      </Stack>

      <Stack className="order-card-items">
        {order.orderItems?.map((item: OrderItem) => {
          const product: Product | undefined = order.productData?.find(
            (ele: Product) => ele._id === item.productId,
          );
          const imagePath = product?.productImages?.[0]
            ? `${serverApi}/${product.productImages[0]}`
            : "/icons/noimage-list.svg";
          return (
            <Stack key={item._id} className="order-item-row" direction="row" alignItems="center">
              <img src={imagePath} alt={product?.productName ?? "Product"} />
              <span className="order-item-name">{product?.productName ?? "Unavailable product"}</span>
              <span className="order-item-qty">x{item.itemQuantity}</span>
              <span className="order-item-price">${(item.itemPrice * item.itemQuantity).toFixed(2)}</span>
            </Stack>
          );
        })}
      </Stack>

      <Stack className="order-card-footer" direction="row" justifyContent="space-between">
        <Stack className="order-card-totals">
          <span>Subtotal ${(order.orderTotal - order.orderDelivery).toFixed(2)}</span>
          <span>Delivery {order.orderDelivery === 0 ? "Free" : `$${order.orderDelivery.toFixed(2)}`}</span>
          <span className="order-card-grand-total">Total ${order.orderTotal.toFixed(2)}</span>
        </Stack>
        {actions && <Stack className="order-card-actions" direction="row">{actions}</Stack>}
      </Stack>
    </Box>
  );
}
