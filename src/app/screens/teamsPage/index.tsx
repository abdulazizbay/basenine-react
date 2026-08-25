import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function TeamsPage() {
  const match = useRouteMatch();

  return (
    <div className="teams-page">
      <Switch>
        <Route path={`${match.path}/:teamId`}>
          <div>Team detail — coming soon</div>
        </Route>
        <Route path={`${match.path}`}>
          <div>Teams list — coming soon</div>
        </Route>
      </Switch>
    </div>
  );
}
