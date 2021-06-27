import axios from "axios"
import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const SingleWorkout = ({match}) => {
  const workoutId = +match.params.workoutId;

  const [workout, setWorkout] = useState({});
  const [poses, setPoses] = useState([])


  useEffect(() => {
    let isMounted = true;
    const fetchWorkout = async () => {
      try {
        const {data} = await axios.get(`/api/workouts/${workoutId}`);
        setWorkout(data)
        setPoses(data.poses)
      } catch (error) {
        console.error(error)
      }
    }
    if(isMounted) fetchWorkout()

    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <div>
      <h1>{workout.name}</h1>
      <p>{workout.spotifyUrl}</p>
      <ul>
        {poses.map((pose) => (
          <li key={pose.id}>{pose.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleWorkout
