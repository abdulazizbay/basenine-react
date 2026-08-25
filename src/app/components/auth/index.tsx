import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { useSnackbar } from "notistack";
import { useGlobals } from "../../hooks/useGlobals";

import "../../../css/auth.css";

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setPassword] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();
  const { setAuthMember } = useGlobals();

  /* =========================================================
     HANDLERS
     ========================================================= */

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") {
      if (signupOpen) {
        handleSignupRequest().then();
      } else if (loginOpen) {
        handleLoginRequest().then();
      }
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";

      if (!isFulfill) {
        throw new Error(Messages.error3);
      }

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
      };

      const member = new MemberService();

      const result = await member.signup(signupInput);

      setAuthMember(result);

      handleSignupClose();

      // Clear fields
      setMemberNick("");
      setMemberPhone("");
      setPassword("");
    } catch (err) {
      console.log(err);

      handleSignupClose();

      enqueueSnackbar(err instanceof Error ? err.message : Messages.error1, {
        variant: "error",
      });
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";

      if (!isFulfill) {
        throw new Error(Messages.error3);
      }

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();

      const result = await member.login(loginInput);

      setAuthMember(result);

      handleLoginClose();

      // Clear fields
      setMemberNick("");
      setPassword("");
    } catch (err) {
      console.log(err);

      handleLoginClose();

      if (
        axios.isAxiosError(err) &&
        (err.response?.status === 401 || err.response?.status === 404)
      ) {
        enqueueSnackbar(Messages.error6, { variant: "error" });
        return;
      }

      enqueueSnackbar(err instanceof Error ? err.message : Messages.error1, {
        variant: "error",
      });
    }
  };

  /* =========================================================
     MODAL
     ========================================================= */

  const isSignup = signupOpen;

  const open = signupOpen || loginOpen;

  const handleClose = isSignup ? handleSignupClose : handleLoginClose;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="auth-modal"
      slotProps={{
        backdrop: {
          className: "auth-backdrop",
        },
      }}
    >
      <Box className="auth-modal-box">
        {/* CLOSE BUTTON */}

        <IconButton className="auth-close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>

        {/* LEFT SIDE */}

        <Box className="auth-visual">
          <Box className="auth-visual-overlay" />

          <Box className="auth-visual-content">
            <Box className="auth-brand">
              <Box className="auth-brand-icon">
                <span>9</span>
              </Box>

              <Box className="auth-brand-text">
                <span className="auth-brand-name">basenine</span>

                <span className="auth-brand-subtitle">BASEBALL PLATFORM</span>
              </Box>
            </Box>

            <Box className="auth-visual-copy">
              <Typography className="auth-eyebrow">
                {isSignup ? "JOIN THE GAME" : "WELCOME BACK"}
              </Typography>

              <Typography className="auth-visual-title">
                {isSignup ? (
                  <>
                    Your baseball
                    <br />
                    journey starts
                    <br />
                    <span>here.</span>
                  </>
                ) : (
                  <>
                    Welcome back
                    <br />
                    to the
                    <br />
                    <span>game.</span>
                  </>
                )}
              </Typography>

              <Typography className="auth-visual-description">
                Follow teams, discover players, track games, and stay connected
                with BaseNine.
              </Typography>
            </Box>

            <Box className="auth-number">09</Box>
          </Box>
        </Box>

        {/* RIGHT SIDE */}

        <Box className="auth-form-container">
          <Stack className="auth-form">
            {/* HEADER */}

            <Box className="auth-form-header">
              <Box className="auth-mobile-logo">
                <Box className="auth-brand-icon">
                  <span>9</span>
                </Box>
              </Box>

              <Typography className="auth-form-title">
                {isSignup ? "Create your account" : "Welcome back"}
              </Typography>

              <Typography className="auth-form-description">
                {isSignup
                  ? "Join BaseNine and follow the game."
                  : "Sign in to continue to BaseNine."}
              </Typography>
            </Box>

            {/* FORM */}

            <Stack className="auth-fields">
              <TextField
                fullWidth
                label="Username"
                value={memberNick}
                onChange={handleUsername}
                variant="outlined"
                autoComplete="username"
                className="auth-input"
              />

              {isSignup && (
                <TextField
                  fullWidth
                  label="Phone number"
                  value={memberPhone}
                  onChange={handlePhone}
                  variant="outlined"
                  autoComplete="tel"
                  className="auth-input"
                />
              )}

              <TextField
                fullWidth
                label="Password"
                value={memberPassword}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                variant="outlined"
                className="auth-input"
              />
            </Stack>

            {/* BUTTON */}

            <Button
              fullWidth
              className="auth-submit"
              onClick={isSignup ? handleSignupRequest : handleLoginRequest}
              endIcon={isSignup ? <PersonAddAltIcon /> : <LoginIcon />}
            >
              {isSignup ? "Create account" : "Login"}
            </Button>

            {/* FOOTER */}

            <Box className="auth-form-footer">
              <span>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (isSignup) {
                    handleSignupClose();
                  } else {
                    handleLoginClose();
                  }
                }}
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </Box>

            <Box className="auth-security">
              <span className="auth-security-dot" />
              Secure BaseNine account
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
