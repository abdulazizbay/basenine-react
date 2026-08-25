import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function PlayersPage() {
  const match = useRouteMatch();

  return (
    <div className="players-page">
      <Switch>
        <Route path={`${match.path}/:playerId`}>
          <div>Player detail — coming soon</div>
        </Route>
        <Route path={`${match.path}`}>
          <div>Players list — coming soon</div>
        </Route>
      </Switch>
    </div>
  );
}
