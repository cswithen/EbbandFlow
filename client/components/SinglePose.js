import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { PosesContext } from "../contexts/posesContext";

const SinglePose = ({ match }) => {
  const poseId = +match.params.poseId;
  const { poses } = useContext(PosesContext);

  const [pose, setPose] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchPose = async () => {
      try {
        const { data } = await axios.get(`/api/poses/${poseId}`);
        setPose(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (isMounted) fetchPose();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>SinglePose</h1>
      {pose.name && (
        <div>
          <h2>{pose.name}</h2>
          <h3>{pose.nameSanskrit}</h3>
        </div>
      )}
    </div>
  );
};

export default SinglePose;
