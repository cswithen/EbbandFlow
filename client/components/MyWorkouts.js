import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get("/api/workouts/me");
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
      <h1>{user.username}</h1>
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

export default MyWorkouts
