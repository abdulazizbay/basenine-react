import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";

export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center gap-4 py-32 text-center">
      <p className="font-display text-6xl font-bold text-bn-white">404</p>
      <p className="text-sm text-bn-muted">This page doesn't exist.</p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center justify-center rounded-full border border-bn-border bg-white/5 px-5 py-2.5 text-sm font-semibold text-bn-white transition-colors hover:bg-white/10"
      >
        Back to Home
      </Link>
    </Container>
  );
}
