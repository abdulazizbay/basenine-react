import { Route, Switch, useRouteMatch } from "react-router-dom";
import Teams from "./Teams";
import TeamDetail from "./TeamDetail";
import "../../../css/teams.css";

export default function TeamsPage() {
  const match = useRouteMatch();

  return (
    <div className="teams-page">
      <Switch>
        <Route path={`${match.path}/:teamId`}>
          <TeamDetail />
        </Route>
        <Route path={`${match.path}`}>
          <Teams />
        </Route>
      </Switch>
    </div>
  );
}
