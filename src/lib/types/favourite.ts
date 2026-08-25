import { FavouriteGroup } from "../enums/favourites.enum";

export interface Favourite {
  _id: string;
  memberId: string;
  favouriteGroup: FavouriteGroup;
  favouriteRefId: string;
  createdAt: Date;
  updatedAt: Date;
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
