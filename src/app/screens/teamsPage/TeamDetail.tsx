import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  setChosenTeam,
  setTeamSubscribers,
  setTeamPlayers,
  setTeamUpcomingGames,
} from "./slice";
import {
  retrieveChosenTeam,
  retrieveTeamSubscribers,
  retrieveTeamPlayers,
  retrieveTeamUpcomingGames,
} from "./selector";
import { Team } from "../../../lib/types/team";
import { TeamSubscriber } from "../../../lib/types/favourite";
import { Player } from "../../../lib/types/player";
import { Game } from "../../../lib/types/game";
import TeamService from "../../services/TeamService";
import PlayerService from "../../services/PlayerService";
import GameService from "../../services/GameService";
import { PlayerOrder } from "../../../lib/enums/player.enum";
import { GameStatus } from "../../../lib/enums/game.enum";
import { Direction } from "../../../lib/types/common";
import { serverApi, Messages } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";

const teamDetailRetriever = createSelector(
  retrieveChosenTeam,
  retrieveTeamSubscribers,
  retrieveTeamPlayers,
  retrieveTeamUpcomingGames,
  (chosenTeam, teamSubscribers, teamPlayers, teamUpcomingGames) => ({
    chosenTeam,
    teamSubscribers,
    teamPlayers,
    teamUpcomingGames,
  }),
);

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenTeam: (data: Team | null) => dispatch(setChosenTeam(data)),
  setTeamSubscribers: (data: TeamSubscriber[]) => dispatch(setTeamSubscribers(data)),
  setTeamPlayers: (data: Player[]) => dispatch(setTeamPlayers(data)),
  setTeamUpcomingGames: (data: Game[]) => dispatch(setTeamUpcomingGames(data)),
});

const POSITION_LABEL: Record<string, string> = {
  PITCHER: "Pitcher",
  CATCHER: "Catcher",
  BASEMAN1: "1st Base",
  BASEMAN2: "2nd Base",
  BASEMAN3: "3rd Base",
  SHORTSTOP: "Shortstop",
  LEFTFIELDER: "Left Field",
  CENTERFIELDER: "Center Field",
  RIGHTFIELDER: "Right Field",
};

function idOf(value?: string | { _id: string } | null): string | undefined {
  if (!value) return undefined;
  return typeof value === "object" ? value._id : value;
}

export default function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { authMember } = useGlobals();

  const { setChosenTeam, setTeamSubscribers, setTeamPlayers, setTeamUpcomingGames } =
    actionDispatch(useDispatch());

  const { chosenTeam, teamSubscribers, teamPlayers, teamUpcomingGames } =
    useSelector(teamDetailRetriever);

  const [subscribing, setSubscribing] = useState<boolean>(false);

  const isSubscribed = Boolean(
    authMember && teamSubscribers.some((sub) => sub._id === authMember._id),
  );

  useEffect(() => {
    const team = new TeamService();
    team.getTeam(teamId).then(setChosenTeam).catch((err) => console.log(err));
    team
      .getTeamSubscribers(teamId, 1, 100)
      .then((data) => setTeamSubscribers(data.list))
      .catch((err) => console.log(err));

    const player = new PlayerService();
    player
      .getPlayers({
        page: 1,
        limit: 100,
        order: PlayerOrder.CREATED_AT,
        direction: Direction.DESC,
      })
      .then((data) => setTeamPlayers(data.list.filter((p) => idOf(p.teamId) === teamId)))
      .catch((err) => console.log(err));

    const game = new GameService();
    game
      .getGames({ page: 1, limit: 100, gameStatus: GameStatus.UPCOMING })
      .then((data) =>
        setTeamUpcomingGames(
          data.list.filter((g) => idOf(g.teamAId) === teamId || idOf(g.teamBId) === teamId),
        ),
      )
      .catch((err) => console.log(err));
  }, [teamId]);

  const handleSubscribeToggle = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (subscribing) return;
      setSubscribing(true);

      const team = new TeamService();
      if (isSubscribed) {
        await team.unsubscribeTeam(teamId);
      } else {
        await team.subscribeTeam(teamId);
      }

      const [updated, subscribers] = await Promise.all([
        team.getTeam(teamId),
        team.getTeamSubscribers(teamId, 1, 100),
      ]);
      setChosenTeam(updated);
      setTeamSubscribers(subscribers.list);
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : Messages.error1, {
        variant: "error",
      });
    } finally {
      setSubscribing(false);
    }
  };

  if (!chosenTeam) return null;

  const imagePath = chosenTeam.teamImage?.[0]
    ? `${serverApi}/${chosenTeam.teamImage[0]}`
    : "/icons/default-user.svg";

  return (
    <div className="team-detail-page">
      <section className="team-hero">
        <Box className="team-hero-glow" />
        <Box className="team-hero-inner">
          <Box className="team-hero-media">
            <img src={imagePath} alt={chosenTeam.teamNick} />
          </Box>

          <Box className="team-hero-info">
            <Box className="team-hero-eyebrow">
              <LocationOnIcon />
              {chosenTeam.teamAddress}
            </Box>
            <Box className="team-hero-name">{chosenTeam.teamNick}</Box>

            <Stack className="team-hero-stats" direction="row">
              <Box className="team-stat">
                <strong>{chosenTeam.teamSubscribers.toLocaleString()}</strong>
                <span>Subscribers</span>
              </Box>
              <Box className="stat-divider" />
              <Box className="team-stat">
                <strong>{chosenTeam.teamViews.toLocaleString()}</strong>
                <span>Views</span>
              </Box>
              <Box className="stat-divider" />
              <Box className="team-stat">
                <strong>{teamPlayers.length}</strong>
                <span>Players</span>
              </Box>
            </Stack>

            <Button
              className={isSubscribed ? "subscribe-button subscribed" : "subscribe-button"}
              onClick={handleSubscribeToggle}
              disabled={subscribing}
            >
              {isSubscribed ? <CheckIcon /> : <AddIcon />}
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </Box>
        </Box>
      </section>

      {teamSubscribers.length !== 0 && (
        <section className="team-subscribers-section">
          <Box className="section-eyebrow">SUPPORTERS</Box>
          <Box className="section-title">Subscribers</Box>
          <Stack className="subscribers-row" direction="row" flexWrap="wrap">
            {teamSubscribers.map((sub: TeamSubscriber) => (
              <Box key={sub._id} className="subscriber-chip">
                <img
                  src={sub.memberImage ? `${serverApi}/${sub.memberImage}` : "/icons/default-user.svg"}
                  alt={sub.memberNick}
                />
                <span>{sub.memberNick}</span>
              </Box>
            ))}
          </Stack>
        </section>
      )}

      <section className="team-players-section">
        <Box className="section-eyebrow">THE ROSTER</Box>
        <Box className="section-title">Players</Box>

        {teamPlayers.length !== 0 ? (
          <Box className="team-players-grid">
            {teamPlayers.map((player: Player) => {
              const playerImage = player.playerImages?.[0]
                ? `${serverApi}/${player.playerImages[0]}`
                : "/icons/default-user.svg";
              return (
                <Box
                  key={player._id}
                  className="team-player-card"
                  onClick={() => history.push(`/players/${player._id}`)}
                >
                  <Box className="team-player-media">
                    <img src={playerImage} alt={player.playerNick} />
                    <span className="team-player-position">
                      {POSITION_LABEL[player.playerPosition] ?? player.playerPosition}
                    </span>
                  </Box>
                  <Box className="team-player-body">
                    <span className="team-player-number">#{player.playerNumber}</span>
                    <span className="team-player-name">{player.playerNick}</span>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box className="no-data">No players on this roster yet</Box>
        )}
      </section>

      <section className="team-games-section">
        <Box className="section-eyebrow">SCHEDULE</Box>
        <Box className="section-title">Upcoming Games</Box>

        {teamUpcomingGames.length !== 0 ? (
          <Stack className="team-games-list">
            {teamUpcomingGames.map((game: Game) => {
              const teamA = typeof game.teamAId === "object" ? game.teamAId : null;
              const teamB = typeof game.teamBId === "object" ? game.teamBId : null;
              const opponent = idOf(game.teamAId) === teamId ? teamB : teamA;
              const gameDate = new Date(game.gameDate);
              return (
                <Box
                  key={game._id}
                  className="team-game-row"
                  onClick={() => history.push(`/games/${game._id}`)}
                >
                  <Box className="team-game-opponent">
                    <img
                      src={
                        opponent?.teamImage?.[0]
                          ? `${serverApi}/${opponent.teamImage[0]}`
                          : "/icons/default-user.svg"
                      }
                      alt={opponent?.teamNick ?? "TBD"}
                    />
                    <span>vs {opponent?.teamNick ?? "TBD"}</span>
                  </Box>
                  <Stack className="team-game-meta" direction="row">
                    <span>
                      <EventIcon />
                      {gameDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      {" · "}
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
          </Stack>
        ) : (
          <Box className="no-data">No upcoming games scheduled</Box>
        )}
      </section>
    </div>
  );
}
