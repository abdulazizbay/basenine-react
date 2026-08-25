import React from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders, retrieveFinishedTotal } from "./selector";
import OrderCard from "./OrderCard";
import { Order } from "../../../lib/types/order";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  retrieveFinishedTotal,
  (finishedOrders, finishedTotal) => ({ finishedOrders, finishedTotal }),
);

interface FinishedOrdersProps {
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function FinishedOrders({ page, limit, onPageChange }: FinishedOrdersProps) {
  const { finishedOrders, finishedTotal } = useSelector(finishedOrdersRetriever);

  const pageCount = Math.max(1, Math.ceil(finishedTotal / limit));

  return (
    <Box className="orders-tab-panel">
      {finishedOrders.length !== 0 ? (
        <>
          <Stack className="orders-list">
            {finishedOrders.map((order: Order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </Stack>
          {finishedTotal > limit && (
            <Stack className="orders-pagination" direction="row" justifyContent="center">
              <Pagination count={pageCount} page={page} onChange={(_, value) => onPageChange(value)} />
            </Stack>
          )}
        </>
      ) : (
        <Box className="no-data">No finished orders yet</Box>
      )}
    </Box>
  );
}
