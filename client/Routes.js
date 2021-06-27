import React, { useContext } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/AuthForm";
import Poses from "./components/Poses";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import Workouts from "./components/Workouts";
import { AuthContext } from "./contexts/auth";
import MyWorkouts from "./components/MyWorkouts";
import EditWorkout from "./components/EditWorkout";

const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && !user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/workouts" component={Workouts} />
          <Route path="/login" component={Login} />
          <Route path="/poses" component={Poses} />
          <Route path="/signup" component={Signup} />
          {/* <Redirect to="/" /> */}
        </Switch>
      )}

      {user.id && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/workouts" component={Workouts} />
          <Route path="/poses" component={Poses} />
          <Route path="/me/workouts/:workoutId" component={EditWorkout} />
          <Route exact path="/me/workouts/" component={MyWorkouts} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
