import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectTeamsPage = (state: AppRootState) => state.teamsPage;

export const retrieveTeams = createSelector(
  selectTeamsPage,
  (TeamsPage) => TeamsPage.teams,
);

export const retrieveTeamTotal = createSelector(
  selectTeamsPage,
  (TeamsPage) => TeamsPage.teamTotal,
);

export const retrieveChosenTeam = createSelector(
  selectTeamsPage,
  (TeamsPage) => TeamsPage.chosenTeam,
);

export const retrieveTeamSubscribers = createSelector(
  selectTeamsPage,
  (TeamsPage) => TeamsPage.teamSubscribers,
);
