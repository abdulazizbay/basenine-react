import Hero from './Hero';
import FeaturedTeams from './FeaturedTeams';
import FeaturedPlayers from './FeaturedPlayers';
import FeaturedProducts from './FeaturedProducts';
import { mockPlayers } from '../../../lib/mocks/players.mock';
import { mockProducts } from '../../../lib/mocks/products.mock';
import { useEffect, useState } from 'react';
import TeamService from '../../services/TeamService';
import { TeamOrder } from '../../../lib/enums/team.enum';
import { Direction } from '../../../lib/types/common';
import type { Team } from '../../../lib/types/team';

export default function HomePage() {
	const [featuredTeams, setFeaturedTeams] = useState<Team[]>([]);
	useEffect(() => {
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

    
	}, []);

	return (
		<div>
			<Hero />
			<FeaturedTeams teams={featuredTeams} />
			<FeaturedPlayers players={mockPlayers.slice(0, 4)} />
			<FeaturedProducts products={mockProducts.slice(0, 4)} />
		</div>
	);
}
