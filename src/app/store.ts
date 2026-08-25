import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homePageReducer from "./screens/homePage/slice";
import reduxLogger from "redux-logger"
import ProductsPageReducer from "./screens/productsPage/slice";
import ordersPageReducer from "./screens/ordersPage/slice";
import teamsPageReducer from "./screens/teamsPage/slice";
import playersPageReducer from "./screens/playersPage/slice";
import gamesPageReducer from "./screens/gamesPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: homePageReducer,
    productsPage: ProductsPageReducer,
    ordersPage: ordersPageReducer,
    teamsPage: teamsPageReducer,
    playersPage: playersPageReducer,
    gamesPage: gamesPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
