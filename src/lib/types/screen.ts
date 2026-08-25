import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";
import { Team } from "./team";
import { Player } from "./player";
import { Game } from "./game";
import { TeamSubscriber } from "./favourite";

// React App State
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
  teamsPage: TeamsPageState;
  playersPage: PlayersPageState;
  gamesPage: GamesPageState;
}

// Homepage
export interface HomePageState {
  bigGame: Game | null;
  popularPlayers: Player[];
  popularTeams: Team[];
  featuredProducts: Product[];
}

// Products Page
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

// Orders Page
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

// Teams Page
export interface TeamsPageState {
  teams: Team[];
  teamTotal: number;
  chosenTeam: Team | null;
  teamSubscribers: TeamSubscriber[];
  teamPlayers: Player[];
  teamUpcomingGames: Game[];
}

// Players Page
export interface PlayersPageState {
  players: Player[];
  playerTotal: number;
  chosenPlayer: Player | null;
}

// Games Page
export interface GamesPageState {
  games: Game[];
  gameTotal: number;
  chosenGame: Game | null;
}
