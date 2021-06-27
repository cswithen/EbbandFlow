import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get("/api/workouts");
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (isMounted) fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>All Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
          <p>{workout.spotifyUrl}</p>
          <ul>
            {workout.poses.map((pose) => (
              <li key={pose.id}>{pose.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllWorkouts
