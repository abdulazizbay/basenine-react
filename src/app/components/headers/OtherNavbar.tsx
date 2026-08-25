import { useRef } from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout, Person } from "@mui/icons-material";

import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;

  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;

  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <header className="other-navbar">
      <Container className="navbar-container">
        <Stack className="navbar-inner">
          {/* ==================== BRAND ==================== */}

          <Box>
            <NavLink to="/" className="brand-link">
              <div className="brand-icon">
                <span>9</span>
              </div>

              <div className="brand-text">
                <span className="brand-name">basenine</span>
                <span className="brand-subtitle">BASEBALL PLATFORM</span>
              </div>
            </NavLink>
          </Box>

          {/* ==================== NAVIGATION ==================== */}

          <Stack className="links" direction="row" alignItems="center">
            <NavLink exact to="/" activeClassName="underline">
              Home
            </NavLink>

            <NavLink to="/teams" activeClassName="underline">
              Teams
            </NavLink>

            <NavLink to="/games" activeClassName="underline">
              Games
            </NavLink>
            <NavLink to="/players" activeClassName="underline">
              Players
            </NavLink>
            <NavLink to="/products" activeClassName="underline">
              Shop
            </NavLink>

            {authMember && (
              <NavLink to="/orders" activeClassName="underline">
                Orders
              </NavLink>
            )}

            {authMember && (
              <NavLink to="/member-page" activeClassName="underline">
                My Page
              </NavLink>
            )}

            {/* ==================== CART ==================== */}

            <Basket
              cartItems={cartItems}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              onAdd={onAdd}
            />

            {/* ==================== AUTH ==================== */}

            {!authMember ? (
              <Button
                className="login-button"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt="User"
                aria-haspopup="true"
                onClick={handleLogoutClick}
              />
            )}
          </Stack>

          {/* ==================== LOGOUT MENU ==================== */}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            id="account-menu"
            onClick={handleCloseLogout}
            onClose={handleCloseLogout}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                minWidth: 150,
                borderRadius: "10px",

                overflow: "visible",

                filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.35))",

                backgroundColor: "#151923",
                color: "#f7f8fa",

                border: "1px solid rgba(255,255,255,0.08)",

                "& .MuiMenuItem-root": {
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  borderRadius: "7px",
                  margin: "4px",
                },

                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                },

                "&:before": {
                  content: '""',
                  display: "block",

                  position: "absolute",

                  top: 0,
                  right: 18,

                  width: 10,
                  height: 10,

                  backgroundColor: "#151923",

                  transform: "translateY(-50%) rotate(45deg)",

                  borderLeft: "1px solid rgba(255,255,255,0.08)",

                  borderTop: "1px solid rgba(255,255,255,0.08)",
                },
              },
            }}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout
                  fontSize="small"
                  sx={{
                    color: "#e5484d",
                  }}
                />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Container>
    </header>
  );
}
