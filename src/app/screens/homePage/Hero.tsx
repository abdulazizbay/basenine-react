import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAuth } from "../../hooks/useAuth";
import { useAuthModal } from "../../hooks/useAuthModal";

export default function Hero() {
  const { authMember } = useAuth();
  const { openSignup } = useAuthModal();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-bn-surface to-bn-bg pt-32 pb-20 sm:pt-40">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-bn-red">
          <span className="h-1.5 w-1.5 rounded-full bg-bn-red shadow-[0_0_10px_rgba(229,72,77,0.7)]" />
          The baseball platform
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold text-bn-white sm:text-5xl">
          Every team. Every player. Every game.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-bn-muted">
          Follow your favorite teams, track upcoming games, and shop official gear — all in
          one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {authMember ? (
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 rounded-full bg-bn-red px-6 py-3 text-sm font-semibold text-bn-white transition-colors hover:bg-bn-red-light"
            >
              Browse Teams <span>&rarr;</span>
            </Link>
          ) : (
            <button
              onClick={openSignup}
              className="inline-flex items-center gap-2 rounded-full bg-bn-red px-6 py-3 text-sm font-semibold text-bn-white transition-colors hover:bg-bn-red-light"
            >
              Join BaseNine <span>&rarr;</span>
            </button>
          )}
          <Link
            to="/games"
            className="inline-flex items-center rounded-full border border-bn-border px-6 py-3 text-sm font-semibold text-bn-white transition-colors hover:bg-white/5"
          >
            Explore Games
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-8">
          <div>
            <p className="font-display text-2xl font-bold text-bn-white">9</p>
            <p className="mt-1 text-xs text-bn-muted">Players on field</p>
          </div>
          <div className="h-8 border-l border-bn-border" />
          <div>
            <p className="font-display text-2xl font-bold text-bn-white">&infin;</p>
            <p className="mt-1 text-xs text-bn-muted">Moments to follow</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
