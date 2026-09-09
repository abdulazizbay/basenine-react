import { useEffect, useState } from 'react';
import type { Team } from '../../../lib/types/team';
import type { Player } from '../../../lib/types/player';
import type { Product } from '../../../lib/types/product';
import TeamService from '../../services/TeamService';
import PlayerService from '../../services/PlayerService';
import ProductService from '../../services/ProductService';
import TeamCard from '../../components/basenine/TeamCard';
import PlayerCard from '../../components/basenine/PlayerCard';
import ProductCard from '../../components/basenine/ProductCard';
import EmptyState from '../../components/ui/EmptyState';
import SectionHeader from '../../components/ui/SectionHeader';
import Pagination from '../../components/ui/Pagination';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../lib/utils/error';

type ViewedTab = 'teams' | 'players' | 'products';

const LIMIT = 6;

const tabChipClass = (active: boolean) =>
	`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
		active
			? 'bg-bn-red text-white'
			: 'border border-bn-border text-bn-muted hover:text-bn-white'
	}`;

export default function RecentlyViewed() {
	const [tab, setTab] = useState<ViewedTab>('teams');

	const [teams, setTeams] = useState<Team[]>([]);
	const [teamsTotal, setTeamsTotal] = useState<number>(0);
	const [teamsPage, setTeamsPage] = useState<number>(1);

	const [players, setPlayers] = useState<Player[]>([]);
	const [playersTotal, setPlayersTotal] = useState<number>(0);
	const [playersPage, setPlayersPage] = useState<number>(1);

	const [products, setProducts] = useState<Product[]>([]);
	const [productsTotal, setProductsTotal] = useState<number>(0);
	const [productsPage, setProductsPage] = useState<number>(1);

	useEffect(() => {
		const teamService = new TeamService();
		teamService
			.getVisitedTeams({ page: teamsPage, limit: LIMIT })
			.then((data) => {
				setTeams(data.list);
				setTeamsTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) =>
				toast.error(getErrorMessage(err, 'Could not load recently viewed teams.')),
			);
	}, [teamsPage]);

	useEffect(() => {
		const playerService = new PlayerService();
		playerService
			.getVisitedPlayers({ page: playersPage, limit: LIMIT })
			.then((data) => {
				setPlayers(data.list);
				setPlayersTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) =>
				toast.error(getErrorMessage(err, 'Could not load recently viewed players.')),
			);
	}, [playersPage]);

	useEffect(() => {
		const productService = new ProductService();
		productService
			.getVisitedProducts({ page: productsPage, limit: LIMIT })
			.then((data) => {
				setProducts(data.list);
				setProductsTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) =>
				toast.error(getErrorMessage(err, 'Could not load recently viewed products.')),
			);
	}, [productsPage]);

	const counts: Record<ViewedTab, number> = {
		teams: teamsTotal,
		players: playersTotal,
		products: productsTotal,
	};

	const handlePageChange =
		(setter: (page: number) => void) => (page: number) => {
			setter(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};

	return (
		<div>
			<SectionHeader eyebrow="History" title="Recently Viewed" />

			<div className="mb-6 flex flex-wrap gap-2">
				<button
					type="button"
					className={tabChipClass(tab === 'teams')}
					onClick={() => setTab('teams')}
				>
					Teams ({counts.teams})
				</button>
				<button
					type="button"
					className={tabChipClass(tab === 'players')}
					onClick={() => setTab('players')}
				>
					Players ({counts.players})
				</button>
				<button
					type="button"
					className={tabChipClass(tab === 'products')}
					onClick={() => setTab('products')}
				>
					Products ({counts.products})
				</button>
			</div>

			{tab === 'teams' &&
				(teams.length !== 0 ? (
					<>
						<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
							{teams.map((team) => (
								<TeamCard key={team._id} team={team} />
							))}
						</div>
						{teamsTotal > LIMIT && (
							<Pagination
								page={teamsPage}
								count={Math.ceil(teamsTotal / LIMIT)}
								onChange={handlePageChange(setTeamsPage)}
							/>
						)}
					</>
				) : (
					<EmptyState title="No recently viewed teams yet" />
				))}

			{tab === 'players' &&
				(players.length !== 0 ? (
					<>
						<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
							{players.map((player) => (
								<PlayerCard key={player._id} player={player} />
							))}
						</div>
						{playersTotal > LIMIT && (
							<Pagination
								page={playersPage}
								count={Math.ceil(playersTotal / LIMIT)}
								onChange={handlePageChange(setPlayersPage)}
							/>
						)}
					</>
				) : (
					<EmptyState title="No recently viewed players yet" />
				))}

			{tab === 'products' &&
				(products.length !== 0 ? (
					<>
						<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
							{products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
						{productsTotal > LIMIT && (
							<Pagination
								page={productsPage}
								count={Math.ceil(productsTotal / LIMIT)}
								onChange={handlePageChange(setProductsPage)}
							/>
						)}
					</>
				) : (
					<EmptyState title="No recently viewed products yet" />
				))}
		</div>
	);
}
