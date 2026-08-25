import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function GamesPage() {
  const match = useRouteMatch();

  return (
    <div className="games-page">
      <Switch>
        <Route path={`${match.path}/:gameId`}>
          <div>Game detail — coming soon</div>
        </Route>
        <Route path={`${match.path}`}>
          <div>Games list — coming soon</div>
        </Route>
      </Switch>
    </div>
  );
}
