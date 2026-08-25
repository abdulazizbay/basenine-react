import { createSlice } from "@reduxjs/toolkit";
import { PlayersPageState } from "../../../lib/types/screen";

const initialState: PlayersPageState = {
  players: [],
  playerTotal: 0,
  chosenPlayer: null,
};

const playersPageSlice = createSlice({
  name: "playersPage",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayerTotal: (state, action) => {
      state.playerTotal = action.payload;
    },
    setChosenPlayer: (state, action) => {
      state.chosenPlayer = action.payload;
    },
  },
});

export const { setPlayers, setPlayerTotal, setChosenPlayer } =
  playersPageSlice.actions;

const playersPageReducer = playersPageSlice.reducer;
export default playersPageReducer;
