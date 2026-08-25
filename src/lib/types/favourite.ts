import { FavouriteGroup } from "../enums/favourites.enum";
import { Team } from "./team";
import { Player } from "./player";

export interface Favourite {
  _id: string;
  memberId: string;
  favouriteGroup: FavouriteGroup;
  favouriteRefId: string;
  createdAt: Date;
  updatedAt: Date;
  // present only on GET /member/detail, which joins the referenced team/player
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
