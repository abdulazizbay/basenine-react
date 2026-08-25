import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  bigGame: null,
  popularPlayers: [],
  popularTeams: [],
  featuredProducts: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBigGame: (state, action) => {
      state.bigGame = action.payload;
    },
    setPopularPlayers: (state, action) => {
      state.popularPlayers = action.payload;
    },
    setPopularTeams: (state, action) => {
      state.popularTeams = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
  },
});

export const { setBigGame, setPopularPlayers, setPopularTeams, setFeaturedProducts } =
  homePageSlice.actions;

const homePageReducer = homePageSlice.reducer
export default homePageReducer