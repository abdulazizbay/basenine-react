import Hero from './Hero';
import FeaturedTeams from './FeaturedTeams';
import FeaturedPlayers from './FeaturedPlayers';
import FeaturedProducts from './FeaturedProducts';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';
import type { Team } from '../../../lib/types/team';
import PlayerService from '../../services/PlayerService';
import { PlayerOrder } from '../../../lib/enums/player.enum';
import type { Player } from '../../../lib/types/player';
import ProductService from '../../services/ProductService';
import { ProductOrder } from '../../../lib/enums/product.enum';
import type { Product } from '../../../lib/types/product';

export default function HomePage() {
	const [featuredTeams, setFeaturedTeams] = useState<Team[]>([]);
	const [featuredPlayers, setFeaturedPlayers] = useState<Player[]>([]);
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
	useEffect(() => {
		// team fetch
		const teamService = new TeamService();
		teamService
			.getTeams({
				order: TeamOrder.SUBSCRIBERS,
				direction: Direction.DESC,
				limit: 8,
				page: 1,
			})
			.then((data) => setFeaturedTeams(data.list))
			.catch((err) => console.log(err));

		// player fetch
		const playerService = new PlayerService();
		playerService
			.getPlayers({
				order: PlayerOrder.VIEWS,
				direction: Direction.DESC,
				limit: 8,
				page: 1,
			})
			.then((data) => setFeaturedPlayers(data.list))
			.catch((err) => console.log(err));

		// products fetch
		const productService = new ProductService();
		productService
			.getProducts({
				order: ProductOrder.VIEWS,
				direction: Direction.DESC,
				limit: 8,
				page: 1,
			})
			.then((data) => setFeaturedProducts(data.list))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Hero />
			<FeaturedTeams teams={featuredTeams} />
			<FeaturedPlayers players={featuredPlayers} />
			<FeaturedProducts products={featuredProducts} />
		</div>
	);
}
