import Container from "../../components/ui/Container";
import SectionHeader from "../../components/ui/SectionHeader";
import PlayersGrid from "./PlayersGrid";
import { useEffect, useState } from "react";
import PlayerService from "../../services/PlayerService";
import { PlayerOrder } from "../../../lib/enums/player.enum";
import { Direction } from "../../../lib/types/common";
import type { Player, PlayerInquiry } from "../../../lib/types/player";

export default function PlayersPage() {
	const [players, setPlayers] = useState<Player[]>([]);
	const [playerTotal, setPlayerTotal] = useState<number>(0);
	const [playerSearch, setPlayerSearch] = useState<PlayerInquiry>({
		order: PlayerOrder.CREATED_AT,
		direction: Direction.ASC,
		limit: 8,
		page: 1,
	});

	useEffect(() => {
		const playerService = new PlayerService();
		playerService
			.getPlayers(playerSearch)
			.then((data) => {
				setPlayers(data.list);
				setPlayerTotal(data.metaCounter[0]?.total ?? 0);
			})
			.catch((err) => console.log(err));
	}, [playerSearch]);

	return (
		<Container className="py-16">
			<SectionHeader eyebrow="The roster" title="Players" />
			<p className="mb-4 text-xs text-bn-muted">{playerTotal} players found</p>
			<PlayersGrid players={players} setPlayerSearch={setPlayerSearch} />
		</Container>
	);
}
