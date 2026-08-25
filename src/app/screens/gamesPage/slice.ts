import { createSlice } from "@reduxjs/toolkit";
import { GamesPageState } from "../../../lib/types/screen";

const initialState: GamesPageState = {
  games: [],
  gameTotal: 0,
  chosenGame: null,
};

const gamesPageSlice = createSlice({
  name: "gamesPage",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setGameTotal: (state, action) => {
      state.gameTotal = action.payload;
    },
    setChosenGame: (state, action) => {
      state.chosenGame = action.payload;
    },
  },
});

export const { setGames, setGameTotal, setChosenGame } =
  gamesPageSlice.actions;

const gamesPageReducer = gamesPageSlice.reducer;
export default gamesPageReducer;
