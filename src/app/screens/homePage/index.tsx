import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import BigGame from "./BigGame";
import PopularPlayers from "./PopularPlayers";
import PopularTeams from "./PopularTeams";
import FeaturedShop from "./FeaturedShop";
import "../../../css/home.css";
import {
  setBigGame,
  setPopularPlayers,
  setPopularTeams,
  setFeaturedProducts,
} from "./slice";
import { Game } from "../../../lib/types/game";
import { Player } from "../../../lib/types/player";
import { Team } from "../../../lib/types/team";
import { Product } from "../../../lib/types/product";
import GameService from "../../services/GameService";
import PlayerService from "../../services/PlayerService";
import TeamService from "../../services/TeamService";
import ProductService from "../../services/ProductService";
import { GameStatus } from "../../../lib/enums/game.enum";
import { PlayerOrder } from "../../../lib/enums/player.enum";
import { TeamOrder } from "../../../lib/enums/team.enum";
import { ProductOrder } from "../../../lib/enums/product.enum";
import { Direction } from "../../../lib/types/common";

const actionDispatch = (dispatch: Dispatch) => ({
  setBigGame: (data: Game | null) => dispatch(setBigGame(data)),
  setPopularPlayers: (data: Player[]) => dispatch(setPopularPlayers(data)),
  setPopularTeams: (data: Team[]) => dispatch(setPopularTeams(data)),
  setFeaturedProducts: (data: Product[]) => dispatch(setFeaturedProducts(data)),
});

export default function HomePage() {
  const { setBigGame, setPopularPlayers, setPopularTeams, setFeaturedProducts } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const game = new GameService();
    game
      .getGames({ page: 1, limit: 1, gameStatus: GameStatus.UPCOMING })
      .then((data) => setBigGame(data.list[0] ?? null))
      .catch((err) => console.log(err));

    const player = new PlayerService();
    player
      .getPlayers({
        page: 1,
        limit: 8,
        order: PlayerOrder.VIEWS,
        direction: Direction.DESC,
      })
      .then((data) => setPopularPlayers(data.list))
      .catch((err) => console.log(err));

    const team = new TeamService();
    team
      .getTeams({
        page: 1,
        limit: 8,
        order: TeamOrder.SUBSCRIBERS,
        direction: Direction.DESC,
      })
      .then((data) => setPopularTeams(data.list))
      .catch((err) => console.log(err));

    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: ProductOrder.VIEWS,
        direction: Direction.DESC,
      })
      .then((data) => setFeaturedProducts(data.list))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <BigGame />
      <PopularPlayers />
      <PopularTeams />
      <FeaturedShop />
    </div>
  );
}
