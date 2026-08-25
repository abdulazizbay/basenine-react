import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { setTeams, setTeamTotal } from "./slice";
import { retrieveTeams, retrieveTeamTotal } from "./selector";
import { Team, TeamInquiry } from "../../../lib/types/team";
import { TeamOrder } from "../../../lib/enums/team.enum";
import { Direction } from "../../../lib/types/common";
import TeamService from "../../services/TeamService";
import { serverApi } from "../../../lib/config";

const teamsRetriever = createSelector(
  retrieveTeams,
  retrieveTeamTotal,
  (teams, teamTotal) => ({ teams, teamTotal }),
);

const actionDispatch = (dispatch: Dispatch) => ({
  setTeams: (data: Team[]) => dispatch(setTeams(data)),
  setTeamTotal: (data: number) => dispatch(setTeamTotal(data)),
});

const SORT_OPTIONS: { label: string; value: TeamOrder }[] = [
  { label: "Newest", value: TeamOrder.CREATED_AT },
  { label: "Most Subscribed", value: TeamOrder.SUBSCRIBERS },
  { label: "Most Viewed", value: TeamOrder.VIEWS },
];

const LIMIT = 8;

export default function Teams() {
  const { setTeams, setTeamTotal } = actionDispatch(useDispatch());
  const { teams, teamTotal } = useSelector(teamsRetriever);
  const history = useHistory();

  const [searchText, setSearchText] = useState<string>("");
  const [teamSearch, setTeamSearch] = useState<TeamInquiry>({
    page: 1,
    limit: LIMIT,
    order: TeamOrder.CREATED_AT,
    direction: Direction.DESC,
  });

  useEffect(() => {
    const team = new TeamService();
    team
      .getTeams(teamSearch)
      .then((data) => {
        setTeams(data.list);
        setTeamTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [teamSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeamSearch((prev) =>
        (prev.search ?? "") === searchText ? prev : { ...prev, page: 1, search: searchText },
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSort = (order: TeamOrder) => {
    setTeamSearch((prev) => ({ ...prev, page: 1, order }));
  };

  const toggleDirection = () => {
    setTeamSearch((prev) => ({
      ...prev,
      page: 1,
      direction: prev.direction === Direction.DESC ? Direction.ASC : Direction.DESC,
    }));
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setTeamSearch((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageCount = Math.max(1, Math.ceil(teamTotal / LIMIT));

  return (
    <div className="teams-list-page">
      <section className="teams-hero">
        <Box className="teams-hero-inner">
          <Box className="teams-hero-eyebrow">THE LEAGUE</Box>
          <Box className="teams-hero-title">Teams</Box>
          <Box className="teams-hero-desc">
            Browse every club, follow the ones you love, and never miss a moment.
          </Box>

          <Stack className="teams-toolbar" direction="row" flexWrap="wrap">
            <Stack className="teams-search" direction="row" alignItems="center">
              <SearchIcon />
              <input
                placeholder="Search teams..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Stack>

            <Stack className="teams-sort" direction="row" alignItems="center" flexWrap="wrap">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={teamSearch.order === opt.value ? "sort-chip active" : "sort-chip"}
                  onClick={() => handleSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
              <button className="direction-toggle" onClick={toggleDirection}>
                <SwapVertIcon />
                {teamSearch.direction === Direction.DESC ? "DESC" : "ASC"}
              </button>
            </Stack>
          </Stack>
        </Box>
      </section>

      <section className="teams-grid-section">
        <Box className="teams-grid-inner">
          {teams.length !== 0 ? (
            <Box className="teams-grid">
              {teams.map((team: Team) => {
                const imagePath = team.teamImage?.[0]
                  ? `${serverApi}/${team.teamImage[0]}`
                  : "/icons/default-user.svg";
                return (
                  <Box
                    key={team._id}
                    className="team-tile"
                    onClick={() => history.push(`/teams/${team._id}`)}
                  >
                    <Box className="team-tile-media">
                      <Box className="team-tile-ring" />
                      <img src={imagePath} alt={team.teamNick} />
                    </Box>
                    <Box className="team-tile-body">
                      <span className="team-tile-name">{team.teamNick}</span>
                      <span className="team-tile-address">{team.teamAddress}</span>
                      <Stack className="team-tile-stats" direction="row">
                        <span>
                          <PeopleAltIcon />
                          {team.teamSubscribers.toLocaleString()}
                        </span>
                        <span>
                          <VisibilityIcon />
                          {team.teamViews.toLocaleString()}
                        </span>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className="no-data">No teams match your search</Box>
          )}

          {teamTotal > LIMIT && (
            <Stack className="teams-pagination" direction="row" justifyContent="center">
              <Pagination count={pageCount} page={teamSearch.page} onChange={handlePageChange} />
            </Stack>
          )}
        </Box>
      </section>
    </div>
  );
}
