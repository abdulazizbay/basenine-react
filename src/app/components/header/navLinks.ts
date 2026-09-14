export interface NavLinkItem {
  label: string;
  to: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Teams", to: "/teams" },
  { label: "Players", to: "/players" },
  { label: "Games", to: "/games" },
  { label: "Standings", to: "/standings" },
  { label: "Shop", to: "/products" },
];

export const ACCOUNT_LINKS: NavLinkItem[] = [
  { label: "My Page", to: "/user" },
  { label: "Orders", to: "/orders" },
];
