import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { setPlayers, setPlayerTotal } from "./slice";
import { retrievePlayers, retrievePlayerTotal } from "./selector";
import { Player, PlayerInquiry } from "../../../lib/types/player";
import { Team } from "../../../lib/types/team";
import { PlayerOrder } from "../../../lib/enums/player.enum";
import { Direction } from "../../../lib/types/common";
import PlayerService from "../../services/PlayerService";
import { serverApi } from "../../../lib/config";
import { POSITION_INFO } from "../../../lib/data/playerPositions";

const playersRetriever = createSelector(
  retrievePlayers,
  retrievePlayerTotal,
  (players, playerTotal) => ({ players, playerTotal }),
);

const actionDispatch = (dispatch: Dispatch) => ({
  setPlayers: (data: Player[]) => dispatch(setPlayers(data)),
  setPlayerTotal: (data: number) => dispatch(setPlayerTotal(data)),
});

const SORT_OPTIONS: { label: string; value: PlayerOrder }[] = [
  { label: "Newest", value: PlayerOrder.CREATED_AT },
  { label: "Most Viewed", value: PlayerOrder.VIEWS },
];

function teamOf(value?: string | Team | null): Team | null {
  return value && typeof value === "object" ? value : null;
}

const LIMIT = 8;

export default function Players() {
  const { setPlayers, setPlayerTotal } = actionDispatch(useDispatch());
  const { players, playerTotal } = useSelector(playersRetriever);
  const history = useHistory();

  const [searchText, setSearchText] = useState<string>("");
  const [playerSearch, setPlayerSearch] = useState<PlayerInquiry>({
    page: 1,
    limit: LIMIT,
    order: PlayerOrder.CREATED_AT,
    direction: Direction.DESC,
  });

  useEffect(() => {
    const player = new PlayerService();
    player
      .getPlayers(playerSearch)
      .then((data) => {
        setPlayers(data.list);
        setPlayerTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [playerSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayerSearch((prev) =>
        (prev.search ?? "") === searchText ? prev : { ...prev, page: 1, search: searchText },
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSort = (order: PlayerOrder) => {
    setPlayerSearch((prev) => ({ ...prev, page: 1, order }));
  };

  const toggleDirection = () => {
    setPlayerSearch((prev) => ({
      ...prev,
      page: 1,
      direction: prev.direction === Direction.DESC ? Direction.ASC : Direction.DESC,
    }));
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setPlayerSearch((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageCount = Math.max(1, Math.ceil(playerTotal / LIMIT));

  return (
    <div className="players-list-page">
      <section className="players-hero">
        <Box className="players-hero-inner">
          <Box className="players-hero-eyebrow">THE ROSTER</Box>
          <Box className="players-hero-title">Players</Box>
          <Box className="players-hero-desc">
            Scout every player in the league, from rising rookies to seasoned veterans.
          </Box>

          <Stack className="players-toolbar" direction="row" flexWrap="wrap">
            <Stack className="players-search" direction="row" alignItems="center">
              <SearchIcon />
              <input
                placeholder="Search players..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Stack>

            <Stack className="players-sort" direction="row" alignItems="center" flexWrap="wrap">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={playerSearch.order === opt.value ? "sort-chip active" : "sort-chip"}
                  onClick={() => handleSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
              <button className="direction-toggle" onClick={toggleDirection}>
                <SwapVertIcon />
                {playerSearch.direction === Direction.DESC ? "DESC" : "ASC"}
              </button>
            </Stack>
          </Stack>
        </Box>
      </section>

      <section className="players-grid-section">
        <Box className="players-grid-inner">
          {players.length !== 0 ? (
            <Box className="players-grid">
              {players.map((player: Player) => {
                const imagePath = player.playerImages?.[0]
                  ? `${serverApi}/${player.playerImages[0]}`
                  : "/icons/default-user.svg";
                const team = teamOf(player.teamId);
                return (
                  <Box
                    key={player._id}
                    className="player-tile"
                    onClick={() => history.push(`/players/${player._id}`)}
                  >
                    <Box className="player-tile-media">
                      <img src={imagePath} alt={player.playerNick} />
                      <span className="player-tile-position">
                        {POSITION_INFO[player.playerPosition]?.abbr ?? player.playerPosition}
                      </span>
                    </Box>
                    <Box className="player-tile-body">
                      <span className="player-tile-name">{player.playerNick}</span>
                      <span className="player-tile-team">{team?.teamNick ?? "Free Agent"}</span>
                      <Stack className="player-tile-stats" direction="row">
                        <span>
                          <VisibilityIcon />
                          {player.playerViews.toLocaleString()}
                        </span>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className="no-data">No players match your search</Box>
          )}

          {playerTotal > LIMIT && (
            <Stack className="players-pagination" direction="row" justifyContent="center">
              <Pagination count={pageCount} page={playerSearch.page} onChange={handlePageChange} />
            </Stack>
          )}
        </Box>
      </section>
    </div>
  );
}
