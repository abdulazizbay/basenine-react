export interface NavLinkItem {
  label: string;
  to: string;
}

// Shared by both navbars; each renders its own chrome around these.
export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Teams", to: "/teams" },
  { label: "Players", to: "/players" },
  { label: "Games", to: "/games" },
  { label: "Shop", to: "/products" },
];
