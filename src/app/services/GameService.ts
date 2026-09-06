import axios from "axios";
import { serverApi } from "../../lib/config";
import type { Game, GameInquiry, Games } from "../../lib/types/game";

class GameService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async getGame(gameId: string): Promise<Game> {
		try {
			const url = `${this.path}/game/${gameId}`;
			const result = await axios.get(url);
			return result.data;
		} catch (err) {
			throw err;
		}
	}
	public async getGames(inquiry: GameInquiry): Promise<Games> {
		try {
			let url = `${this.path}/game/all?page=${inquiry.page}&limit=${inquiry.limit}`;
			if (inquiry.gameStatus) url += `&gameStatus=${inquiry.gameStatus}`;
			if (inquiry.gameAddress) url += `&gameAddress=${inquiry.gameAddress}`;
			if (inquiry.startDate) url += `&startDate=${new Date(inquiry.startDate).toISOString()}`;
			if (inquiry.endDate) url += `&endDate=${new Date(inquiry.endDate).toISOString()}`;
			if (inquiry.teamId) url += `&teamId=${inquiry.teamId}`;

			const result = await axios.get(url, { withCredentials: true });
			return result.data;
		} catch (err) {
			throw err;
		}
	}
}

export default GameService;
