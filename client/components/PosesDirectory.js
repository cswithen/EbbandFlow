import React, { useContext, useEffect } from "react";
import { PosesContext } from "../contexts/posesContext";
import { Link, } from "react-router-dom";

const PosesDirectory = () => {
  const { poses } = useContext(PosesContext);

  return (
    <div>
      <h1>Poses</h1>
      {poses.map((pose) => (
        <div key={pose.id}>
          <Link key={pose.id} to={`/poses/${pose.id}`}>
            {pose.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PosesDirectory;
