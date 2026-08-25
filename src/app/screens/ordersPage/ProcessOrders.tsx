import React from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";
import { retrieveProcessOrders, retrieveProcessTotal } from "./selector";
import OrderCard from "./OrderCard";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Messages } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  retrieveProcessTotal,
  (processOrders, processTotal) => ({ processOrders, processTotal }),
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function ProcessOrders({ setValue, page, limit, onPageChange }: ProcessOrdersProps) {
  const { processOrders, processTotal } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();
  const { enqueueSnackbar } = useSnackbar();

  const finishOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (!window.confirm("Have you received your order?")) return;
      const order = new OrderService();
      const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.FINISH };
      await order.updateOrder(input);
      setValue("3");
      setOrderBuilder(new Date());
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : Messages.error1, { variant: "error" });
    }
  };

  const pageCount = Math.max(1, Math.ceil(processTotal / limit));

  return (
    <Box className="orders-tab-panel">
      {processOrders.length !== 0 ? (
        <>
          <Stack className="orders-list">
            {processOrders.map((order: Order) => (
              <OrderCard
                key={order._id}
                order={order}
                actions={
                  <button
                    className="order-action-primary"
                    onClick={() => finishOrderHandler(order._id)}
                  >
                    Verify to Fulfil
                  </button>
                }
              />
            ))}
          </Stack>
          {processTotal > limit && (
            <Stack className="orders-pagination" direction="row" justifyContent="center">
              <Pagination count={pageCount} page={page} onChange={(_, value) => onPageChange(value)} />
            </Stack>
          )}
        </>
      ) : (
        <Box className="no-data">No orders in progress</Box>
      )}
    </Box>
  );
}
