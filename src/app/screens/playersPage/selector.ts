import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectPlayersPage = (state: AppRootState) => state.playersPage;

export const retrievePlayers = createSelector(
  selectPlayersPage,
  (PlayersPage) => PlayersPage.players,
);

export const retrievePlayerTotal = createSelector(
  selectPlayersPage,
  (PlayersPage) => PlayersPage.playerTotal,
);

export const retrieveChosenPlayer = createSelector(
  selectPlayersPage,
  (PlayersPage) => PlayersPage.chosenPlayer,
);
