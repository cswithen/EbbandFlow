import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SingleWorkout = ({ match }) => {
  const workoutId = +match.params.workoutId;

  const [workout, setWorkout] = useState({});
  const [poses, setPoses] = useState([]);

  let substring = "";

  if (workout.spotifyUrl) {
    const url = workout.spotifyUrl;

    const firstIndex = url.indexOf("playlist/");
    const strLength = "playlist/".length;

    substring = url.substring(firstIndex + strLength, url.indexOf("?"));
  }

  useEffect(() => {
    let isMounted = true;
    const fetchWorkout = async () => {
      try {
        const { data } = await axios.get(`/api/workouts/${workoutId}`);
        setWorkout(data);
        setPoses(data.poses);
      } catch (error) {
        console.error(error);
      }
    };
    if (isMounted) fetchWorkout();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>{workout.name}</h1>
      <ul>
        {poses.map((pose) => (
          <li key={pose.id}>{pose.name}</li>
        ))}
      </ul>
      <iframe
        src={`https://open.spotify.com/embed/playlist/${substring}`}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default SingleWorkout;
