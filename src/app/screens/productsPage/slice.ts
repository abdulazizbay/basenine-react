import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  products: [],
  productTotal: 0,
  chosenProduct: null,
  teamOptions: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductTotal: (state, action) => {
      state.productTotal = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setTeamOptions: (state, action) => {
      state.teamOptions = action.payload;
    },
  },
});

export const { setProducts, setProductTotal, setChosenProduct, setTeamOptions } =
  productsPageSlice.actions;
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
