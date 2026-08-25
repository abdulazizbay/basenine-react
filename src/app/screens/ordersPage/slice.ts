import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
  pausedOrders: [],
  pausedTotal: 0,
  processOrders: [],
  processTotal: 0,
  finishedOrders: [],
  finishedTotal: 0,
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setPausedTotal: (state, action) => {
      state.pausedTotal = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setProcessTotal: (state, action) => {
      state.processTotal = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
    setFinishedTotal: (state, action) => {
      state.finishedTotal = action.payload;
    },
  },
});

export const {
  setPausedOrders,
  setPausedTotal,
  setProcessOrders,
  setProcessTotal,
  setFinishedOrders,
  setFinishedTotal,
} = ordersPageSlice.actions;

const ordersPageReducer = ordersPageSlice.reducer;
export default ordersPageReducer;
