import { Link } from "react-router-dom";
import Container from "../ui/Container";

const FOOTER_LINKS = [
  { label: "Teams", to: "/teams" },
  { label: "Players", to: "/players" },
  { label: "Games", to: "/games" },
  { label: "Shop", to: "/products" },
];

export default function Footer() {
  return (
    <footer className="border-t border-bn-border bg-bn-surface">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-bn-white">basenine</p>
          <p className="mt-1 text-xs text-bn-muted">Baseball, followed closely.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-medium text-bn-muted transition-colors hover:text-bn-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-bn-muted">&copy; {new Date().getFullYear()} basenine</p>
      </Container>
    </footer>
  );
}
