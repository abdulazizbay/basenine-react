import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectGamesPage = (state: AppRootState) => state.gamesPage;

export const retrieveGames = createSelector(
  selectGamesPage,
  (GamesPage) => GamesPage.games,
);

export const retrieveGameTotal = createSelector(
  selectGamesPage,
  (GamesPage) => GamesPage.gameTotal,
);

export const retrieveChosenGame = createSelector(
  selectGamesPage,
  (GamesPage) => GamesPage.chosenGame,
);
