import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import styled from "styled-components";

const Title = styled.h2``;
const TitleWorkout = styled.h3``;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  flex: 2 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 35em;
`;
const TitleContainer = styled.div`
  flex: 2 0 auto;
  display: flex;
  flex-direction: row;
  max-width: 35em;
  justify-content: space-between;
  align-items: center;
`;

const linkStyle = {
  textDecoration: "none",
  color: "#1e403c",
  padding: 8,
};

const PoseContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "#d99379" : "#f2ebec")};
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#639cbf" : "#f2ebec"};
`;

const Button = styled.button`
  cursor: pointer;
  background: ${(props) => (props.primary ? "#639cbf" : "#d99379")};
  color: ${(props) => (props.primary ? "#f2ebec" : "#f2ebec")};

  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 0.25em;
  border: 0px solid ${(props) => (props.primary ? "#FFFFFF" : "")};
  border-radius: 3px;
  transition: 0.5s all ease-out;

  &:hover {
    color: #735449;
    background-color: ${(props) => (props.primary ? "#ffffff" : "#ffffff")}
`;

const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  let history = useHistory();

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
      history.push(`/me/workouts/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Title>My Workouts</Title>
      {workouts.map((workout) => (
        <Container key={workout.id}>
          <TitleContainer>
            <TitleWorkout>
              <Link style={linkStyle} to={`/workouts/${workout.id}`}>
                {workout.name}
              </Link>
            </TitleWorkout>

            <Button
              as="a"
              href={`/me/workouts/${workout.id}`}
              className="navLink"
              primary
            >
              Edit
            </Button>
          </TitleContainer>
          <TaskList>
            {workout.poses.map((pose) => (
              <PoseContainer key={pose.id}>{pose.name}</PoseContainer>
            ))}
          </TaskList>
        </Container>
      ))}
      <Button onClick={handleClick}>Create New</Button>
    </div>
  );
};

export default MyWorkouts;
