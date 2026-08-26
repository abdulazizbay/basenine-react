import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "./navLinks";

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-bn-white" : "text-bn-muted hover:text-bn-white"
  }`;

// Overlay variant — see OtherNavbar for the solid-bar variant on other routes.
export default function HomeNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <span className="font-display text-lg font-bold text-bn-white">basenine</span>
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
