import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { retrievePopularTeams } from "./selector";
import { Team } from "../../../lib/types/team";
import { serverApi } from "../../../lib/config";

const popularTeamsRetriever = createSelector(
  retrievePopularTeams,
  (popularTeams) => ({ popularTeams }),
);

export default function PopularTeams() {
  const { popularTeams } = useSelector(popularTeamsRetriever);
  const history = useHistory();

  return (
    <section className="popular-teams-section">
      <Container>
        <Stack
          className="section-header"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Box className="section-eyebrow">FAN FAVORITES</Box>
            <Box className="section-title">Popular Teams</Box>
          </Box>
          <button className="section-view-all" onClick={() => history.push("/teams")}>
            View All
            <ArrowForwardIcon />
          </button>
        </Stack>

        {popularTeams.length !== 0 ? (
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
            className="teams-swiper"
          >
            {popularTeams.map((team: Team) => {
              const imagePath = team.teamImage?.[0]
                ? `${serverApi}/${team.teamImage[0]}`
                : "/icons/default-user.svg";
              return (
                <SwiperSlide key={team._id}>
                  <Box className="team-card" onClick={() => history.push(`/teams/${team._id}`)}>
                    <Box className="team-card-plate">
                      <Box className="team-card-ring" />
                      <img src={imagePath} alt={team.teamNick} />
                    </Box>
                    <Box className="team-card-body">
                      <span className="team-card-name">{team.teamNick}</span>
                      <span className="team-card-address">{team.teamAddress}</span>
                      <Box className="team-card-stat">
                        <PeopleAltIcon />
                        {team.teamSubscribers.toLocaleString()} subscribers
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Box className="no-data">No teams yet</Box>
        )}
      </Container>
    </section>
  );
}
