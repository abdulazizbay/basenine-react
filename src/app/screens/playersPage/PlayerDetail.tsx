import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setChosenPlayer } from "./slice";
import { retrieveChosenPlayer } from "./selector";
import { Player } from "../../../lib/types/player";
import { Team } from "../../../lib/types/team";
import PlayerService from "../../services/PlayerService";
import { serverApi } from "../../../lib/config";
import { POSITION_INFO, POSITION_ORDER } from "../../../lib/data/playerPositions";
import PositionDiagram from "./PositionDiagram";

const playerDetailRetriever = createSelector(retrieveChosenPlayer, (chosenPlayer) => ({
  chosenPlayer,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenPlayer: (data: Player | null) => dispatch(setChosenPlayer(data)),
});

function teamOf(value?: string | Team | null): Team | null {
  return value && typeof value === "object" ? value : null;
}

export default function PlayerDetail() {
  const { playerId } = useParams<{ playerId: string }>();
  const history = useHistory();
  const { setChosenPlayer } = actionDispatch(useDispatch());
  const { chosenPlayer } = useSelector(playerDetailRetriever);

  useEffect(() => {
    const player = new PlayerService();
    player.getPlayer(playerId).then(setChosenPlayer).catch((err) => console.log(err));
  }, [playerId]);

  if (!chosenPlayer) return null;

  const imagePath = chosenPlayer.playerImages?.[0]
    ? `${serverApi}/${chosenPlayer.playerImages[0]}`
    : "/icons/default-user.svg";
  const team = teamOf(chosenPlayer.teamId);
  const positionInfo = POSITION_INFO[chosenPlayer.playerPosition];
  const positionLabel = positionInfo?.label ?? chosenPlayer.playerPosition;

  return (
    <div className="player-detail-page">
      <section className="player-hero">
        <Box className="player-hero-glow" />
        <Box className="player-hero-inner">
          <Box className="player-hero-media">
            <img src={imagePath} alt={chosenPlayer.playerNick} />
            <span className="player-hero-position">{positionInfo?.abbr ?? chosenPlayer.playerPosition}</span>
          </Box>

          <Box className="player-hero-info">
            <Box className="player-hero-eyebrow">JERSEY #{chosenPlayer.playerNumber}</Box>
            <Box className="player-hero-name">{chosenPlayer.playerNick}</Box>

            <Stack className="player-hero-stats" direction="row">
              <Box className="player-stat">
                <strong>{chosenPlayer.playerViews.toLocaleString()}</strong>
                <span>Views</span>
              </Box>
              <Box className="stat-divider" />
              <Box className="player-stat">
                <strong>{chosenPlayer.playerHeight ? `${chosenPlayer.playerHeight} cm` : "—"}</strong>
                <span>Height</span>
              </Box>
              <Box className="stat-divider" />
              <Box className="player-stat">
                <strong>{positionLabel}</strong>
                <span>Position</span>
              </Box>
            </Stack>

            {team ? (
              <Box className="player-team-card" onClick={() => history.push(`/teams/${team._id}`)}>
                <img
                  src={
                    team.teamImage?.[0] ? `${serverApi}/${team.teamImage[0]}` : "/icons/default-user.svg"
                  }
                  alt={team.teamNick}
                />
                <Box className="player-team-card-info">
                  <span className="player-team-card-label">Team</span>
                  <span className="player-team-card-name">{team.teamNick}</span>
                </Box>
                <ArrowForwardIcon />
              </Box>
            ) : (
              <Box className="player-team-card free-agent">
                <Box className="player-team-card-info">
                  <span className="player-team-card-label">Team</span>
                  <span className="player-team-card-name">Free Agent</span>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </section>

      <section className="position-section">
        <Box className="section-eyebrow">SCOUTING REPORT</Box>
        <Box className="section-title">Position Guide</Box>

        <Stack className="position-layout" direction="row">
          <Box className="position-diagram-wrap">
            <PositionDiagram activePosition={chosenPlayer.playerPosition} />
          </Box>

          <Box className="position-guide-list">
            {POSITION_ORDER.map((pos) => {
              const info = POSITION_INFO[pos];
              const isActive = pos === chosenPlayer.playerPosition;
              return (
                <Box
                  key={pos}
                  className={isActive ? "position-guide-card active" : "position-guide-card"}
                >
                  <Box className="position-guide-abbr">{info.abbr}</Box>
                  <Box className="position-guide-body">
                    <span className="position-guide-title">
                      {info.label} <em>({info.abbr})</em>
                    </span>
                    <p className="position-guide-desc">{info.description}</p>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </section>
    </div>
  );
}
