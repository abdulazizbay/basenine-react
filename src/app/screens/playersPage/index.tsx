import { Route, Switch, useRouteMatch } from "react-router-dom";
import Players from "./Players";
import PlayerDetail from "./PlayerDetail";
import "../../../css/players.css";

export default function PlayersPage() {
  const match = useRouteMatch();

  return (
    <div className="players-page">
      <Switch>
        <Route path={`${match.path}/:playerId`}>
          <PlayerDetail />
        </Route>
        <Route path={`${match.path}`}>
          <Players />
        </Route>
      </Switch>
    </div>
  );
}
