import React, { useContext } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/AuthForm";
import Poses from "./components/Poses"
import Signup from "./components/Signup"
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
        <Route path="/signup" component={Signup} />
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
