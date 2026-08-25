import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { retrieveBigGame } from "./selector";
import { Team } from "../../../lib/types/team";
import { serverApi } from "../../../lib/config";

const bigGameRetriever = createSelector(retrieveBigGame, (bigGame) => ({
  bigGame,
}));

function teamOf(value: string | Team): Team | null {
  return typeof value === "object" ? value : null;
}

export default function BigGame() {
  const { bigGame } = useSelector(bigGameRetriever);
  const history = useHistory();

  if (!bigGame) return null;

  const teamA = teamOf(bigGame.teamAId);
  const teamB = teamOf(bigGame.teamBId);
  const gameDate = new Date(bigGame.gameDate);

  return (
    <section className="big-game-section">
      <Container className="big-game-container">
        <Box className="big-game-card">
          <Box className="big-game-glow" />

          <Stack className="big-game-eyebrow" direction="row" justifyContent="center">
            <span className="live-dot" />
            FEATURED MATCHUP
          </Stack>

          <Stack
            className="big-game-matchup"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box className="big-game-team">
              <Box className="big-game-team-media">
                <img
                  src={
                    teamA?.teamImage?.[0]
                      ? `${serverApi}/${teamA.teamImage[0]}`
                      : "/icons/default-user.svg"
                  }
                  alt={teamA?.teamNick ?? "Team A"}
                />
              </Box>
              <span className="big-game-team-name">{teamA?.teamNick ?? "TBD"}</span>
            </Box>

            <Box className="big-game-vs">
              <span>VS</span>
            </Box>

            <Box className="big-game-team">
              <Box className="big-game-team-media">
                <img
                  src={
                    teamB?.teamImage?.[0]
                      ? `${serverApi}/${teamB.teamImage[0]}`
                      : "/icons/default-user.svg"
                  }
                  alt={teamB?.teamNick ?? "Team B"}
                />
              </Box>
              <span className="big-game-team-name">{teamB?.teamNick ?? "TBD"}</span>
            </Box>
          </Stack>

          <Stack className="big-game-meta" direction="row" justifyContent="center" flexWrap="wrap">
            <Box className="big-game-chip">
              <EventIcon />
              {gameDate.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Box>
            <Box className="big-game-chip">
              <AccessTimeIcon />
              {gameDate.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Box>
            {bigGame.gameAddress && (
              <Box className="big-game-chip">
                <LocationOnIcon />
                {bigGame.gameAddress}
              </Box>
            )}
          </Stack>

          <Button
            className="big-game-button"
            onClick={() => history.push(`/games/${bigGame._id}`)}
          >
            View Game
            <span>→</span>
          </Button>
        </Box>
      </Container>
    </section>
  );
}
