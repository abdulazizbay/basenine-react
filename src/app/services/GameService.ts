import axios from "axios";
import { serverApi } from "../../lib/config";
import { Game, GameInquiry, Games } from "../../lib/types/game";

class GameService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  // memberAddress is never sent — backend derives it from the auth cookie
  public async getGames(inquiry: GameInquiry): Promise<Games> {
    try {
      let url = `${this.path}/game/all?page=${inquiry.page}&limit=${inquiry.limit}`;
      if (inquiry.gameAddress) url += `&gameAddress=${inquiry.gameAddress}`;
      if (inquiry.gameStatus) url += `&gameStatus=${inquiry.gameStatus}`;
      if (inquiry.startDate) url += `&startDate=${new Date(inquiry.startDate).toISOString()}`;
      if (inquiry.endDate) url += `&endDate=${new Date(inquiry.endDate).toISOString()}`;

      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (err) {
      throw err;
    }
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
}

export default GameService;
