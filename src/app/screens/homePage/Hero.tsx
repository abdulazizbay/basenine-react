import Container from "../../components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-bn-surface to-bn-bg pt-32 pb-16 sm:pt-40">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bn-red">
          Baseball, followed closely
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold text-bn-white sm:text-5xl">
          Every team. Every player. Every game.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-bn-muted">
          Follow your favorite teams, track upcoming games, and shop official gear — all in
          one place.
        </p>
      </Container>
    </section>
  );
}
