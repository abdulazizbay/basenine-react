import axios from 'axios';
import { serverApi } from '../../lib/config';
import type { TeamInquiry, Teams } from '../../lib/types/team';

class TeamService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async getTeams(inquiry: TeamInquiry): Promise<Teams> {
		try {
			let url = `${this.path}/teams/all?order=${inquiry.order}&direction=${inquiry.direction}&limit=${inquiry.limit}&page=${inquiry.page}`;
			if (inquiry.search) url += `&search=${inquiry.search}`;

			const result = await axios.get(url);
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}
}

export default TeamService