import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";
import {
  setProcessOrders,
  setPausedOrders,
  setFinishedOrders,
  setProcessTotal,
  setPausedTotal,
  setFinishedTotal,
} from "./slice";
import { Order } from "../../../lib/types/order";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setPausedTotal: (data: number) => dispatch(setPausedTotal(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setProcessTotal: (data: number) => dispatch(setProcessTotal(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setFinishedTotal: (data: number) => dispatch(setFinishedTotal(data)),
});

const TABS = [
  { value: "1", label: "Pending" },
  { value: "2", label: "Processing" },
  { value: "3", label: "Delivered" },
];

const LIMIT = 5;

export default function OrdersPage() {
  const history = useHistory();
  const {
    setPausedOrders,
    setPausedTotal,
    setProcessOrders,
    setProcessTotal,
    setFinishedOrders,
    setFinishedTotal,
  } = actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();

  const [value, setValue] = useState("1");
  const [pausedPage, setPausedPage] = useState(1);
  const [processPage, setProcessPage] = useState(1);
  const [finishedPage, setFinishedPage] = useState(1);

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ page: pausedPage, limit: LIMIT, orderStatus: OrderStatus.PAUSE })
      .then((data) => {
        setPausedOrders(data.list);
        setPausedTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [pausedPage, orderBuilder]);

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ page: processPage, limit: LIMIT, orderStatus: OrderStatus.PROCESS })
      .then((data) => {
        setProcessOrders(data.list);
        setProcessTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [processPage, orderBuilder]);

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ page: finishedPage, limit: LIMIT, orderStatus: OrderStatus.FINISH })
      .then((data) => {
        setFinishedOrders(data.list);
        setFinishedTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [finishedPage, orderBuilder]);

  if (!authMember) history.push("/");

  return (
    <div className="orders-page">
      <section className="orders-hero">
        <Box className="orders-hero-inner">
          <Box className="orders-hero-eyebrow">MY ACCOUNT</Box>
          <Box className="orders-hero-title">Orders</Box>
          <Box className="orders-hero-desc">Track every order, from checkout to delivery.</Box>

          <Box className="orders-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={value === tab.value ? "sort-chip active" : "sort-chip"}
                onClick={() => setValue(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </Box>
        </Box>
      </section>

      <section className="orders-list-section">
        <Box className="orders-list-inner">
          {value === "1" && (
            <PausedOrders
              setValue={setValue}
              page={pausedPage}
              limit={LIMIT}
              onPageChange={setPausedPage}
            />
          )}
          {value === "2" && (
            <ProcessOrders
              setValue={setValue}
              page={processPage}
              limit={LIMIT}
              onPageChange={setProcessPage}
            />
          )}
          {value === "3" && (
            <FinishedOrders page={finishedPage} limit={LIMIT} onPageChange={setFinishedPage} />
          )}
        </Box>
      </section>
    </div>
  );
}
