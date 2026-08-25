import { Address } from "../enums/common.enum";
import { GameStatus } from "../enums/game.enum";
import { Team } from "./team";

export interface Game {
  _id: string;
  teamAId: string | Team;
  teamBId: string | Team;
  gameDate: Date;
  gameAddress: Address;
  gameStatus: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Games {
  list: Game[];
  metaCounter: { total: number }[];
}

export interface GameInquiry {
  page: number;
  limit: number;
  gameAddress?: Address;
  gameStatus?: GameStatus;
  startDate?: Date;
  endDate?: Date;
}
