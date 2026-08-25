import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { retrievePopularPlayers } from "./selector";
import { Player } from "../../../lib/types/player";
import { Team } from "../../../lib/types/team";
import { serverApi } from "../../../lib/config";

const popularPlayersRetriever = createSelector(
  retrievePopularPlayers,
  (popularPlayers) => ({ popularPlayers }),
);

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

function teamOf(value?: string | Team | null): Team | null {
  return value && typeof value === "object" ? value : null;
}

export default function PopularPlayers() {
  const { popularPlayers } = useSelector(popularPlayersRetriever);
  const history = useHistory();

  return (
    <section className="popular-players-section">
      <Container>
        <Stack
          className="section-header"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Box className="section-eyebrow">PLAYER SPOTLIGHT</Box>
            <Box className="section-title">Popular Players</Box>
          </Box>
          <button className="section-view-all" onClick={() => history.push("/players")}>
            View All
            <ArrowForwardIcon />
          </button>
        </Stack>

        {popularPlayers.length !== 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1.15}
            breakpoints={{
              560: { slidesPerView: 1.9 },
              900: { slidesPerView: 2.8 },
              1280: { slidesPerView: 3.6 },
            }}
            className="players-swiper"
          >
            {popularPlayers.map((player: Player) => {
              const imagePath = player.playerImages?.[0]
                ? `${serverApi}/${player.playerImages[0]}`
                : "/icons/default-user.svg";
              const team = teamOf(player.teamId);
              return (
                <SwiperSlide key={player._id}>
                  <Box
                    className="player-card"
                    onClick={() => history.push(`/players/${player._id}`)}
                  >
                    <Box className="player-card-media">
                      <img src={imagePath} alt={player.playerNick} />
                      <span className="player-card-position">
                        {POSITION_LABEL[player.playerPosition] ?? player.playerPosition}
                      </span>
                      <Box className="player-card-content">
                        <span className="player-card-number">#{player.playerNumber}</span>
                        <span className="player-card-name">{player.playerNick}</span>
                        <span className="player-card-team">{team?.teamNick ?? "Free Agent"}</span>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Box className="no-data">No players yet</Box>
        )}
      </Container>
    </section>
  );
}
