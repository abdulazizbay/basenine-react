import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);

export const retrieveProductTotal = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.productTotal,
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);

export const retrieveTeamOptions = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.teamOptions,
);
