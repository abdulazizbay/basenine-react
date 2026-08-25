import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { setChosenGame } from "./slice";
import { retrieveChosenGame } from "./selector";
import { Game } from "../../../lib/types/game";
import { Team } from "../../../lib/types/team";
import { GameStatus } from "../../../lib/enums/game.enum";
import GameService from "../../services/GameService";
import { serverApi } from "../../../lib/config";

const gameDetailRetriever = createSelector(retrieveChosenGame, (chosenGame) => ({
  chosenGame,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenGame: (data: Game | null) => dispatch(setChosenGame(data)),
});

const STATUS_LABEL: Record<GameStatus, string> = {
  [GameStatus.UPCOMING]: "Upcoming",
  [GameStatus.PROCESS]: "Live",
  [GameStatus.FINISHED]: "Finished",
};

function teamOf(value: string | Team): Team | null {
  return typeof value === "object" ? value : null;
}

export default function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const history = useHistory();
  const { setChosenGame } = actionDispatch(useDispatch());
  const { chosenGame } = useSelector(gameDetailRetriever);

  useEffect(() => {
    const game = new GameService();
    game.getGame(gameId).then(setChosenGame).catch((err) => console.log(err));
  }, [gameId]);

  if (!chosenGame) return null;

  const teamA = teamOf(chosenGame.teamAId);
  const teamB = teamOf(chosenGame.teamBId);
  const gameDate = new Date(chosenGame.gameDate);
  const statusLabel = STATUS_LABEL[chosenGame.gameStatus] ?? chosenGame.gameStatus;

  return (
    <div className="game-detail-page">
      <section className="game-hero">
        <Box className="game-hero-glow" />
        <Box className="game-hero-inner">
          <span className={`game-hero-status status-${chosenGame.gameStatus.toLowerCase()}`}>
            {statusLabel}
          </span>

          <Stack className="game-hero-matchup" direction="row" alignItems="center" justifyContent="center">
            <Box
              className="game-hero-team"
              onClick={() => teamA && history.push(`/teams/${teamA._id}`)}
            >
              <Box className="game-hero-team-media">
                <img
                  src={
                    teamA?.teamImage?.[0]
                      ? `${serverApi}/${teamA.teamImage[0]}`
                      : "/icons/default-user.svg"
                  }
                  alt={teamA?.teamNick ?? "Team A"}
                />
              </Box>
              <span className="game-hero-team-name">{teamA?.teamNick ?? "TBD"}</span>
            </Box>

            <Box className="game-hero-vs">
              <span>VS</span>
            </Box>

            <Box
              className="game-hero-team"
              onClick={() => teamB && history.push(`/teams/${teamB._id}`)}
            >
              <Box className="game-hero-team-media">
                <img
                  src={
                    teamB?.teamImage?.[0]
                      ? `${serverApi}/${teamB.teamImage[0]}`
                      : "/icons/default-user.svg"
                  }
                  alt={teamB?.teamNick ?? "Team B"}
                />
              </Box>
              <span className="game-hero-team-name">{teamB?.teamNick ?? "TBD"}</span>
            </Box>
          </Stack>

          <Stack className="game-hero-meta" direction="row" justifyContent="center" flexWrap="wrap">
            <Box className="game-hero-chip">
              <EventIcon />
              {gameDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Box>
            <Box className="game-hero-chip">
              <AccessTimeIcon />
              {gameDate.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
            </Box>
            <Box className="game-hero-chip">
              <LocationOnIcon />
              {chosenGame.gameAddress}
            </Box>
          </Stack>
        </Box>
      </section>
    </div>
  );
}
