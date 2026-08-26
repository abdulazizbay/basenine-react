import Hero from "./Hero";
import FeaturedTeams from "./FeaturedTeams";
import FeaturedPlayers from "./FeaturedPlayers";
import FeaturedProducts from "./FeaturedProducts";
import { mockTeams } from "../../../lib/mocks/teams.mock";
import { mockPlayers } from "../../../lib/mocks/players.mock";
import { mockProducts } from "../../../lib/mocks/products.mock";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedTeams teams={mockTeams.slice(0, 4)} />
      <FeaturedPlayers players={mockPlayers.slice(0, 4)} />
      <FeaturedProducts products={mockProducts.slice(0, 4)} />
    </div>
  );
}
