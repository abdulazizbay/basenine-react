import { createSlice } from "@reduxjs/toolkit";
import { TeamsPageState } from "../../../lib/types/screen";

const initialState: TeamsPageState = {
  teams: [],
  teamTotal: 0,
  chosenTeam: null,
  teamSubscribers: [],
  teamPlayers: [],
  teamUpcomingGames: [],
};

const teamsPageSlice = createSlice({
  name: "teamsPage",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setTeamTotal: (state, action) => {
      state.teamTotal = action.payload;
    },
    setChosenTeam: (state, action) => {
      state.chosenTeam = action.payload;
    },
    setTeamSubscribers: (state, action) => {
      state.teamSubscribers = action.payload;
    },
    setTeamPlayers: (state, action) => {
      state.teamPlayers = action.payload;
    },
    setTeamUpcomingGames: (state, action) => {
      state.teamUpcomingGames = action.payload;
    },
  },
});

export const {
  setTeams,
  setTeamTotal,
  setChosenTeam,
  setTeamSubscribers,
  setTeamPlayers,
  setTeamUpcomingGames,
} = teamsPageSlice.actions;

const teamsPageReducer = teamsPageSlice.reducer;
export default teamsPageReducer;
