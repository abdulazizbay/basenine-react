import { PlayerOrder, PlayerPosition } from "../enums/player.enum";
import { Direction } from "./common";
import type { Team } from "./team";

export interface Player {
  _id: string;
  playerNick: string;
  playerImages: string[];
  playerPosition: PlayerPosition;
  playerNumber: number;
  playerDateOfBirth: Date;
  playerHeight: number;
  teamId?: string | Team | null;
  playerViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Players {
  list: Player[];
  metaCounter: { total: number }[];
}

export interface PlayerInquiry {
  order: PlayerOrder;
  direction: Direction;
  page: number;
  limit: number;
  search?: string;
  teamId?: string
}
