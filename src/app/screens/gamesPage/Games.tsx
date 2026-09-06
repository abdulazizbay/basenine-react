import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import EmptyState from "../../components/ui/EmptyState";
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
		<Container className="py-16">
			<SectionHeader eyebrow="Schedule" title="Games" />
			<p className="mb-4 text-xs text-bn-muted">{gameTotal} games found</p>
			{games.length !== 0 ? (
				<GamesGrid games={games} setGameSearch={setGameSearch} />
			) : (
				<EmptyState
					title="No games scheduled yet"
					description="Upcoming and past games will appear here."
				/>
			)}
		</Container>
	);
}
