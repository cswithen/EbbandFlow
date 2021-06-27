import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  let history = useHistory()

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

  const handleClick = async () => {
    try {
      const { data } = await axios.post("/api/workouts/me");
      history.push(`/me/workouts/${data.id}`)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
          <div>
            <Link to={`/me/workouts/${workout.id}`}>Edit</Link>
          </div>
          <p>{workout.spotifyUrl}</p>
          <ul>
            {workout.poses.map((pose) => (
              <li key={pose.id}>{pose.name}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleClick}>Create New</button>
    </div>
  );
};

export default MyWorkouts;
