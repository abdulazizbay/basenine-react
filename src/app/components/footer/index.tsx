import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  background: #090b11;
  color: #f7f8fa;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Container maxWidth={false} className="footer-container">
        {/* TOP */}
        <Stack className="footer-top">
          {/* BRAND */}
          <Stack className="footer-brand">
            <NavLink to="/" className="footer-brand-link">
              <div className="footer-brand-icon">
                <span>9</span>
              </div>

              <div className="footer-brand-text">
                <span className="footer-brand-name">basenine</span>
                <span className="footer-brand-subtitle">BASEBALL PLATFORM</span>
              </div>
            </NavLink>

            <p className="footer-description">
              Everything baseball, in one place. Follow teams, discover players,
              track games, and stay connected to the game you love.
            </p>

            {/* SOCIALS */}
            <Stack className="footer-socials" direction="row">
              <a href="#" aria-label="Facebook">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>

              <a href="#" aria-label="Twitter">
                <img src="/icons/twitter.svg" alt="Twitter" />
              </a>

              <a href="#" aria-label="Instagram">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>

              <a href="#" aria-label="YouTube">
                <img src="/icons/youtube.svg" alt="YouTube" />
              </a>
            </Stack>
          </Stack>

          {/* NAVIGATION */}
          <Stack className="footer-column">
            <h3>Explore</h3>

            <NavLink to="/">Home</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/products">Shop</NavLink>
          </Stack>

          {/* ACCOUNT */}
          <Stack className="footer-column">
            <h3>Account</h3>

            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/member-page">My Page</NavLink>
            <NavLink to="/help">Help</NavLink>
          </Stack>

          {/* CONTACT */}
          <Stack className="footer-column footer-contact">
            <h3>BaseNine</h3>

            <Box className="footer-contact-item">
              <span>Location</span>
              <p>Busan, South Korea</p>
            </Box>

            <Box className="footer-contact-item">
              <span>Email</span>
              <p>contact@basenine.com</p>
            </Box>

            <Box className="footer-contact-item">
              <span>Platform</span>
              <p>Baseball for everyone.</p>
            </Box>
          </Stack>
        </Stack>

        {/* DIVIDER */}
        <Box className="footer-divider" />

        {/* BOTTOM */}
        <Stack
          className="footer-bottom"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span>
            © {new Date().getFullYear()} BaseNine. All rights reserved.
          </span>

          <span className="footer-bottom-right">
            Built for the love of baseball.
          </span>
        </Stack>
      </Container>
    </FooterWrapper>
  );
}
