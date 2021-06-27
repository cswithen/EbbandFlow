import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const AddContainer = styled.div`
  flex-wrap: wrap;
  flex-shrink: 1;
  padding: 8px;
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  flex: 2 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 25em;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: #f2ebec;
`;

const PoseContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "#d99379" : "#f2ebec")};
`;

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
    <BigContainer>
      <Container>
        <Title>{workout.name}</Title>
        <TaskList>
          {poses.map((pose, index) => (
            <PoseContainer key={pose.id}>
              {index + 1}
              {". "}
              {pose.name}
            </PoseContainer>
          ))}
        </TaskList>
      </Container>
      <AddContainer>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${substring}`}
          width="300"
          height="450"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </AddContainer>
    </BigContainer>
  );
};

export default SingleWorkout;
