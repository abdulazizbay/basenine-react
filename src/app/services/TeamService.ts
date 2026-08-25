import axios from "axios";
import { serverApi } from "../../lib/config";
import { Team, TeamInquiry, Teams } from "../../lib/types/team";
import { Favourite, TeamSubscribers } from "../../lib/types/favourite";

class TeamService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getTeams(inquiry: TeamInquiry): Promise<Teams> {
    try {
      let url = `${this.path}/team/all?order=${inquiry.order}&direction=${inquiry.direction}&page=${inquiry.page}&limit=${inquiry.limit}`;
      if (inquiry.search) url += `&search=${inquiry.search}`;

      const result = await axios.get(url);
      return result.data.result;
    } catch (err) {
      throw err;
    }
  }

  public async getTeamOptions(): Promise<Pick<Team, "_id" | "teamNick">[]> {
    try {
      const url = `${this.path}/team/options`;
      const result = await axios.get(url);
      return result.data;
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
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      throw err;
    }
  }

  // backend route is GET, not POST
  public async subscribeTeam(teamId: string): Promise<Favourite> {
    try {
      const url = `${this.path}/team/${teamId}/subscribe`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data.result;
    } catch (err) {
      throw err;
    }
  }

  // backend route is GET, not POST
  public async unsubscribeTeam(teamId: string): Promise<boolean> {
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
