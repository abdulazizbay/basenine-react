import axios from 'axios';
import { serverApi } from '../../lib/config';
import type { Team, TeamInquiry, Teams } from '../../lib/types/team';
import type {
	TeamSubscriber,
	TeamSubscribers,
} from '../../lib/types/favourite';

class TeamService {
	private readonly path: string;
	constructor() {
		this.path = serverApi;
	}
	public async getTeams(inquiry: TeamInquiry): Promise<Teams> {
		try {
			let url = `${this.path}/team/all?order=${inquiry.order}&direction=${inquiry.direction}&limit=${inquiry.limit}&page=${inquiry.page}`;
			if (inquiry.search) url += `&search=${inquiry.search}`;

			const result = await axios.get(url);
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}
	public async getTeam(teamId: string): Promise<Team> {
		try {
			const url = `${this.path}/team/${teamId}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}
	public async getTeamSubscribers(
		teamId: string,
		page: number,
		limit: number,
	): Promise<TeamSubscribers> {
		try {
			const url = `${this.path}/team/${teamId}/subscribers?page=${page}&limit=${limit}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data;
		} catch (err) {
			throw err;
		}
	}
	public async subscribeTeam(teamId: string): Promise<TeamSubscriber> {
		try {
			const url = `${this.path}/team/${teamId}/subscribe`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data.result;
		} catch (err) {
			throw err;
		}
	}

	public async unSubscribeTeam(teamId: string): Promise<boolean> {
		try {
			const url = `${this.path}/team/${teamId}/unsubscribe`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data.data;
		} catch (err) {
			throw err;
		}
	}
}

export default TeamService;
