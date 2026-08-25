import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { setGames, setGameTotal } from "./slice";
import { retrieveGames, retrieveGameTotal } from "./selector";
import { Game, GameInquiry } from "../../../lib/types/game";
import { Team } from "../../../lib/types/team";
import { GameStatus } from "../../../lib/enums/game.enum";
import { Address } from "../../../lib/enums/common.enum";
import GameService from "../../services/GameService";
import { serverApi } from "../../../lib/config";

const gamesRetriever = createSelector(
  retrieveGames,
  retrieveGameTotal,
  (games, gameTotal) => ({ games, gameTotal }),
);

const actionDispatch = (dispatch: Dispatch) => ({
  setGames: (data: Game[]) => dispatch(setGames(data)),
  setGameTotal: (data: number) => dispatch(setGameTotal(data)),
});

const STATUS_OPTIONS: { label: string; value?: GameStatus }[] = [
  { label: "All Games", value: undefined },
  { label: "Upcoming", value: GameStatus.UPCOMING },
  { label: "Live", value: GameStatus.PROCESS },
  { label: "Finished", value: GameStatus.FINISHED },
];

const STATUS_LABEL: Record<GameStatus, string> = {
  [GameStatus.UPCOMING]: "Upcoming",
  [GameStatus.PROCESS]: "Live",
  [GameStatus.FINISHED]: "Finished",
};

function teamOf(value: string | Team): Team | null {
  return typeof value === "object" ? value : null;
}

const LIMIT = 9;

export default function Games() {
  const { setGames, setGameTotal } = actionDispatch(useDispatch());
  const { games, gameTotal } = useSelector(gamesRetriever);
  const history = useHistory();

  const [gameSearch, setGameSearch] = useState<GameInquiry>({
    page: 1,
    limit: LIMIT,
  });

  useEffect(() => {
    const game = new GameService();
    game
      .getGames(gameSearch)
      .then((data) => {
        setGames(data.list);
        setGameTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [gameSearch]);

  const handleStatusFilter = (status?: GameStatus) => {
    setGameSearch((prev) => ({ ...prev, page: 1, gameStatus: status }));
  };

  const handleAddressFilter = (value: string) => {
    setGameSearch((prev) => ({
      ...prev,
      page: 1,
      gameAddress: value ? (value as Address) : undefined,
    }));
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setGameSearch((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageCount = Math.max(1, Math.ceil(gameTotal / LIMIT));

  return (
    <div className="games-list-page">
      <section className="games-hero">
        <Box className="games-hero-inner">
          <Box className="games-hero-eyebrow">THE SCHEDULE</Box>
          <Box className="games-hero-title">Games</Box>
          <Box className="games-hero-desc">
            Every matchup on the calendar — upcoming, live, and finished.
          </Box>

          <Stack className="games-toolbar" direction="row" flexWrap="wrap">
            <Stack className="games-status" direction="row" alignItems="center" flexWrap="wrap">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  className={gameSearch.gameStatus === opt.value ? "sort-chip active" : "sort-chip"}
                  onClick={() => handleStatusFilter(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </Stack>

            <Stack className="games-address" direction="row" alignItems="center">
              <LocationOnIcon />
              <select
                value={gameSearch.gameAddress ?? ""}
                onChange={(e) => handleAddressFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {Object.values(Address).map((addr) => (
                  <option key={addr} value={addr}>
                    {addr}
                  </option>
                ))}
              </select>
            </Stack>
          </Stack>
        </Box>
      </section>

      <section className="games-grid-section">
        <Box className="games-grid-inner">
          {games.length !== 0 ? (
            <Box className="games-grid">
              {games.map((game: Game) => {
                const teamA = teamOf(game.teamAId);
                const teamB = teamOf(game.teamBId);
                const gameDate = new Date(game.gameDate);
                return (
                  <Box
                    key={game._id}
                    className="game-card"
                    onClick={() => history.push(`/games/${game._id}`)}
                  >
                    <span className={`game-card-status status-${game.gameStatus.toLowerCase()}`}>
                      {STATUS_LABEL[game.gameStatus] ?? game.gameStatus}
                    </span>

                    <Stack className="game-card-matchup" direction="row" alignItems="center">
                      <Box className="game-card-team">
                        <img
                          src={
                            teamA?.teamImage?.[0]
                              ? `${serverApi}/${teamA.teamImage[0]}`
                              : "/icons/default-user.svg"
                          }
                          alt={teamA?.teamNick ?? "Team A"}
                        />
                        <span>{teamA?.teamNick ?? "TBD"}</span>
                      </Box>

                      <Box className="game-card-vs">VS</Box>

                      <Box className="game-card-team">
                        <img
                          src={
                            teamB?.teamImage?.[0]
                              ? `${serverApi}/${teamB.teamImage[0]}`
                              : "/icons/default-user.svg"
                          }
                          alt={teamB?.teamNick ?? "Team B"}
                        />
                        <span>{teamB?.teamNick ?? "TBD"}</span>
                      </Box>
                    </Stack>

                    <Stack className="game-card-meta" direction="row" flexWrap="wrap">
                      <span>
                        <EventIcon />
                        {gameDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                      <span>
                        <AccessTimeIcon />
                        {gameDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span>
                        <LocationOnIcon />
                        {game.gameAddress}
                      </span>
                    </Stack>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className="no-data">No games match these filters</Box>
          )}

          {gameTotal > LIMIT && (
            <Stack className="games-pagination" direction="row" justifyContent="center">
              <Pagination count={pageCount} page={gameSearch.page} onChange={handlePageChange} />
            </Stack>
          )}
        </Box>
      </section>
    </div>
  );
}
