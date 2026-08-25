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
  products: Product[];
  productTotal: number;
  chosenProduct: Product | null;
  teamOptions: Pick<Team, "_id" | "teamNick">[];
}

// Orders Page
export interface OrdersPageState {
  pausedOrders: Order[];
  pausedTotal: number;
  processOrders: Order[];
  processTotal: number;
  finishedOrders: Order[];
  finishedTotal: number;
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
