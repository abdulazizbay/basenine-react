import Hero from './Hero';
import BigGame from './BigGame';
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
import GameService from '../../services/GameService';
import { GameStatus } from '../../../lib/enums/game.enum';
import type { Game } from '../../../lib/types/game';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../lib/utils/error';

export default function HomePage() {
	const [featuredTeams, setFeaturedTeams] = useState<Team[]>([]);
	const [featuredPlayers, setFeaturedPlayers] = useState<Player[]>([]);
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
	const [bigGame, setBigGame] = useState<Game | null>(null);
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
			.catch((err) => toast.error(getErrorMessage(err, 'Could not load the homepage.'), {
					id: 'home-load',
				}));

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
			.catch((err) => toast.error(getErrorMessage(err, 'Could not load the homepage.'), {
					id: 'home-load',
				}));

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
			.catch((err) => toast.error(getErrorMessage(err, 'Could not load the homepage.'), {
					id: 'home-load',
				}));

		// big game fetch
		const gameService = new GameService();
		gameService
			.getGames({ page: 1, limit: 1, gameStatus: GameStatus.UPCOMING })
			.then((data) => setBigGame(data.list[0] ?? null))
			.catch((err) => toast.error(getErrorMessage(err, 'Could not load the homepage.'), {
					id: 'home-load',
				}));
	}, []);

	return (
		<div>
			<Hero />
			<BigGame game={bigGame} />
			<FeaturedTeams teams={featuredTeams} />
			<FeaturedPlayers players={featuredPlayers} />
			<FeaturedProducts products={featuredProducts} />
		</div>
	);
}
