import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveBigGame = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bigGame,
);

export const retrievePopularPlayers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularPlayers,
);

export const retrievePopularTeams = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularTeams,
);

export const retrieveFeaturedProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.featuredProducts,
);
