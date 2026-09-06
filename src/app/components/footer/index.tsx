import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Brand from "../ui/Brand";
import { useAuth } from "../../hooks/useAuth";

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Teams", to: "/teams" },
  { label: "Games", to: "/games" },
  { label: "Shop", to: "/products" },
];

const footerLinkClassName =
  "text-[13px] text-bn-muted transition-all hover:translate-x-0.5 hover:text-bn-white";

export default function Footer() {
  const { authMember } = useAuth();

  return (
    <footer className="border-t border-white/5 bg-bn-bg text-bn-white">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_0.8fr_0.8fr_1.2fr] lg:gap-14">
        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-flex w-fit">
            <Brand />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-bn-muted">
            Everything baseball, in one place. Follow teams, discover players, track games,
            and stay connected to the game you love.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="mb-1 font-display text-[13px] font-semibold text-bn-white">
            Explore
          </h3>
          {EXPLORE_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={footerLinkClassName}>
              {link.label}
            </Link>
          ))}
        </div>

        {authMember && (
          <div className="flex flex-col items-start gap-3">
            <h3 className="mb-1 font-display text-[13px] font-semibold text-bn-white">
              Account
            </h3>
            <Link to="/orders" className={footerLinkClassName}>
              Orders
            </Link>
            <Link to="/user" className={footerLinkClassName}>
              My Page
            </Link>
          </div>
        )}

        <div className="flex flex-col items-start gap-4 sm:col-span-2 lg:col-span-1">
          <h3 className="font-display text-[13px] font-semibold text-bn-white">BaseNine</h3>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-bn-muted/60">
              Location
            </span>
            <p className="mt-1 text-[13px] text-bn-muted">Busan, South Korea</p>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-bn-muted/60">
              Email
            </span>
            <p className="mt-1 text-[13px] text-bn-muted">contact@basenine.com</p>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/5">
        <Container className="flex flex-col items-start justify-between gap-2 py-6 text-[11px] text-bn-muted/70 sm:flex-row sm:items-center">
          <span>&copy; {new Date().getFullYear()} BaseNine. All rights reserved.</span>
          <span className="text-bn-muted/50">Built for the love of baseball.</span>
        </Container>
      </div>
    </footer>
  );
}
