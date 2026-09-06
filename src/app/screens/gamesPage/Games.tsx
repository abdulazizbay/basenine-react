import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import GamesGrid from "./GamesGrid";
import { useEffect, useState } from "react";
import GameService from "../../services/GameService";
import type { Game, GameInquiry } from "../../../lib/types/game";

export default function Games() {
	const [games, setGames] = useState<Game[]>([]);
	const [gameTotal, setGameTotal] = useState<number>(0);
	const [gameSearch, setGameSearch] = useState<GameInquiry>({
		limit: 8,
		page: 1,
	});

	useEffect(() => {
		const gameService = new GameService();
		gameService
			.getGames(gameSearch)
			.then((data) => {
				setGames(data.list);
				setGameTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) => console.log(err));
	}, [gameSearch]);

	return (
		<div>
			<section className="bg-linear-to-b from-bn-surface to-bn-bg pb-8 pt-32 sm:pt-40">
				<Container>
					<SectionHeader eyebrow="Schedule" title="Games" />
					<p className="-mt-6 max-w-lg text-sm text-bn-muted">
						Every matchup on the calendar — upcoming, live, and finished.
					</p>
				</Container>
			</section>

			<Container className="py-12">
				<p className="mb-4 text-xs text-bn-muted">{gameTotal} games found</p>
				<GamesGrid
					games={games}
					gameSearch={gameSearch}
					setGameSearch={setGameSearch}
				/>
			</Container>
		</div>
	);
}
