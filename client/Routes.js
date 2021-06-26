import React, { useContext } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/AuthForm";
import Poses from "./components/Poses"
import LandingPage from "./components/LandingPage";
import { AuthContext } from "./contexts/auth";

const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && !user.id && (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/poses" component={Poses} />
        {/* <Redirect to="/" /> */}
      </Switch>
      )}

      {user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/poses" component={Poses} />
        </Switch>
      )}
    </div>
  );
};

export default Routes
