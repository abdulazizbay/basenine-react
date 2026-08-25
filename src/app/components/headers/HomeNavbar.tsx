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
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
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

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <header className="home-header">
      {/* NAVBAR */}
      <div className="home-navbar">
        <Container maxWidth={false} className="navbar-container">
          <Stack className="navbar-inner">
            <NavLink to="/" className="brand-link">
              <div className="brand-icon">
                <span>9</span>
              </div>

              <div className="brand-text">
                <span className="brand-name">basenine</span>
                <span className="brand-subtitle">BASEBALL PLATFORM</span>
              </div>
            </NavLink>

            <Stack className="nav-links" direction="row" alignItems="center">
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>

              <NavLink to="/teams" activeClassName="active">
                Teams
              </NavLink>

              <NavLink to="/games" activeClassName="active">
                Games
              </NavLink>
              <NavLink to="/players" activeClassName="active">
                Players
              </NavLink>
              <NavLink to="/products" activeClassName="active">
                Shop
              </NavLink>

              {authMember && (
                <>
                  <NavLink to="/orders" activeClassName="active">
                    Orders
                  </NavLink>

                  <NavLink to="/member-page" activeClassName="active">
                    My Page
                  </NavLink>
                </>
              )}

              <Basket
                cartItems={cartItems}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
                onAdd={onAdd}
              />

              {!authMember ? (
                <Button
                  className="nav-login"
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
                  onClick={handleLogoutClick}
                  alt="user"
                />
              )}
            </Stack>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
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
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "#e5484d" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Container>
      </div>

      {/* HERO */}
      <section className="hero-section">
        <Container maxWidth={false} className="hero-container">
          <Stack className="hero-content">
            <div className="hero-label">
              <span className="live-dot" />
              THE BASEBALL PLATFORM
            </div>

            <h1>
              Every team.
              <br />
              <span>Every player.</span>
              <br />
              Every game.
            </h1>

            <p>
              Follow teams, discover players, track games, and gear up for the
              season — all in one place.
            </p>

            <div className="hero-actions">
              {!authMember ? (
                <Button
                  className="hero-primary"
                  onClick={() => setSignupOpen(true)}
                >
                  Join BaseNine
                  <span>→</span>
                </Button>
              ) : (
                <Button
                  component={NavLink}
                  to="/teams"
                  className="hero-primary"
                >
                  Browse Teams
                  <span>→</span>
                </Button>
              )}

              <Button
                component={NavLink}
                to="/games"
                className="hero-secondary"
              >
                Explore Games
              </Button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>9</strong>
                <span>Players on field</span>
              </div>

              <div className="stat-divider" />

              <div>
                <strong>∞</strong>
                <span>Moments to follow</span>
              </div>
            </div>
          </Stack>

          {/* BASEBALL VISUAL */}
          <Box className="hero-visual">
            <div className="visual-glow" />

            <div className="diamond">
              <div className="base first" />
              <div className="base second" />
              <div className="base third" />
              <div className="home-base" />

              <div className="pitcher">
                <span />
              </div>
            </div>

            <div className="baseball">
              <div className="seam seam-one" />
              <div className="seam seam-two" />
            </div>

            <div className="visual-number">09</div>

            <div className="visual-caption">
              <span>PLAY</span>
              <strong>THE GAME</strong>
            </div>
          </Box>
        </Container>
      </section>
    </header>
  );
}
