export interface NavLinkItem {
  label: string;
  to: string;
  authOnly?: boolean;
}

// Shared by both navbars; each renders its own chrome around these.
export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Teams", to: "/teams" },
  { label: "Players", to: "/players" },
  { label: "Games", to: "/games" },
  { label: "Shop", to: "/products" },
  { label: "Orders", to: "/orders", authOnly: true },
  { label: "My Page", to: "/user", authOnly: true },
];
