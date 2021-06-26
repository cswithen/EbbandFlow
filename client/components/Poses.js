import React, { useContext } from "react";
import PosesProvider, { PosesContext } from "../contexts/posesContext";
import PosesDirectory from "./PosesDirectory";
import SinglePose from "./SinglePose";
import { Route, Switch } from "react-router-dom";

const Poses = () => {

  return(
    <div>
      <PosesProvider>
        <Switch>
          <Route path='/poses/:poseId' component={SinglePose} />
          <Route path='/' component={PosesDirectory} />
        </Switch>
      </PosesProvider>
    </div>
  )
}

export default Poses
