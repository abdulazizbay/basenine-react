import { Route, Switch, useRouteMatch } from "react-router-dom";
import Games from "./Games";
import GameDetail from "./GameDetail";
import "../../../css/games.css";

export default function GamesPage() {
  const match = useRouteMatch();

  return (
    <div className="games-page">
      <Switch>
        <Route path={`${match.path}/:gameId`}>
          <GameDetail />
        </Route>
        <Route path={`${match.path}`}>
          <Games />
        </Route>
      </Switch>
    </div>
  );
}
