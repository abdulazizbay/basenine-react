import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders,
);

export const retrievePausedTotal = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedTotal,
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders,
);

export const retrieveProcessTotal = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processTotal,
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders,
);

export const retrieveFinishedTotal = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedTotal,
);
