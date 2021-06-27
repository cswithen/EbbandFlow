import React from "react";
import AllWorkouts from "./AllWorkouts";
import SingleWorkout from "./SingleWorkout";
import { Route, Switch } from "react-router-dom";

const Workouts = () => {
  return (
    <div>
      <Switch>
        <Route path="/workouts/:workoutId" component={SingleWorkout} />
        <Route path="/workouts/" component={AllWorkouts} />
      </Switch>
    </div>
  );
};

export default Workouts;
