import axios from 'axios';
import { serverApi } from '../../lib/config';
import type { Player, PlayerInquiry, Players } from '../../lib/types/player';

class PlayerService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async getPlayer(playerId: string): Promise<Player> {
		try {
			const url = `${this.path}/player/${playerId}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}
	public async getPlayers(inquiry: PlayerInquiry): Promise<Players> {
		try {
			let url = `${this.path}/player/all?order=${inquiry.order}&direction=${inquiry.direction}&limit=${inquiry.limit}&page=${inquiry.page}`;
			if (inquiry.search) url += `&search=${inquiry.search}`;
			if (inquiry.teamId) url += `&teamId=${inquiry.teamId}`;

			const result = await axios.get(url);
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}
}

export default PlayerService