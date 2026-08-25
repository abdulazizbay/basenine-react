import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import Settings from "./Settings";
import "../../../css/userPage.css";
import { useGlobals } from "../../hooks/useGlobals";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { Favourite } from "../../../lib/types/favourite";
import { serverApi } from "../../../lib/config";

type MemberDetail = Member & { favourites: Favourite[] };

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  const [memberDetail, setMemberDetail] = useState<MemberDetail | null>(null);

  useEffect(() => {
    if (!authMember) return;
    const member = new MemberService();
    member.getMemberDetail().then(setMemberDetail).catch((err) => console.log(err));
  }, [authMember]);

  if (!authMember) {
    history.push("/");
    return null;
  }
  if (!memberDetail) return null;

  const subscribedTeams = memberDetail.favourites
    .filter((fav) => fav.team && fav.team.length !== 0)
    .map((fav) => fav.team![0]);

  const imagePath = memberDetail.memberImage
    ? `${serverApi}/${memberDetail.memberImage}`
    : "/icons/default-user.svg";

  return (
    <div className="user-page">
      <section className="profile-hero">
        <Box className="profile-hero-glow" />
        <Box className="profile-hero-inner">
          <img className="profile-avatar" src={imagePath} alt={memberDetail.memberNick} />
          <Box className="profile-hero-info">
            <span className="profile-type-badge">{memberDetail.memberType}</span>
            <Box className="profile-name">{memberDetail.memberNick}</Box>
            <span className="profile-since">
              Member since{" "}
              {new Date(memberDetail.createdAt).toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </span>
          </Box>
        </Box>
      </section>

      <section className="profile-content">
        <Box className="profile-content-inner">
          <Stack className="profile-grid" direction="row">
            <Box className="profile-main">
              <Box className="section-eyebrow">ACCOUNT</Box>
              <Box className="section-title">Edit Profile</Box>
              <Settings
                memberDetail={memberDetail}
                onUpdated={(updated) =>
                  setMemberDetail((prev) => (prev ? { ...prev, ...updated } : prev))
                }
              />
            </Box>

            <Box className="profile-side">
              <Box className="profile-info-card">
                <Box className="section-eyebrow">DETAILS</Box>
                <Box className="section-title">Account Info</Box>
                <Stack className="profile-info-list">
                  <Stack className="profile-info-row" direction="row" justifyContent="space-between">
                    <span>Username</span>
                    <span>{memberDetail.memberNick}</span>
                  </Stack>
                  <Stack className="profile-info-row" direction="row" justifyContent="space-between">
                    <span>Phone</span>
                    <span>{memberDetail.memberPhone}</span>
                  </Stack>
                  <Stack className="profile-info-row" direction="row" justifyContent="space-between">
                    <span>Address</span>
                    <span>{memberDetail.memberAddress ?? "Not set"}</span>
                  </Stack>
                  <Stack className="profile-info-row" direction="row" justifyContent="space-between">
                    <span>Status</span>
                    <span>{memberDetail.memberStatus}</span>
                  </Stack>
                </Stack>
              </Box>

              <Box className="profile-info-card">
                <Box className="section-eyebrow">FOLLOWING</Box>
                <Box className="section-title">Subscribed Teams</Box>
                {subscribedTeams.length !== 0 ? (
                  <Stack className="profile-teams-list">
                    {subscribedTeams.map((team) => (
                      <Box
                        key={team._id}
                        className="profile-team-row"
                        onClick={() => history.push(`/teams/${team._id}`)}
                      >
                        <img
                          src={
                            team.teamImage?.[0]
                              ? `${serverApi}/${team.teamImage[0]}`
                              : "/icons/default-user.svg"
                          }
                          alt={team.teamNick}
                        />
                        <span>{team.teamNick}</span>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Box className="no-data">No subscribed teams yet</Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </section>
    </div>
  );
}
