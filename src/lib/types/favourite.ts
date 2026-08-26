import { FavouriteGroup } from "../enums/favourites.enum";
import type { Team } from "./team";
import type { Player } from "./player";

export interface Favourite {
  _id: string;
  memberId: string;
  favouriteGroup: FavouriteGroup;
  favouriteRefId: string;
  createdAt: Date;
  updatedAt: Date;
  team?: Team[];
  player?: Player[];
}

export interface TeamSubscriber {
  _id: string;
  memberNick: string;
  memberImage: string;
  createdAt: Date;
}

export interface TeamSubscribers {
  list: TeamSubscriber[];
  metaCounter: { total: number }[];
}
