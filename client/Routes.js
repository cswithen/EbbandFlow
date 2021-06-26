import React, { useContext } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/AuthForm";
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
        {/* <Redirect to="/" /> */}
      </Switch>
      )}

      {user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      )}
    </div>
  );
};

export default Routes
