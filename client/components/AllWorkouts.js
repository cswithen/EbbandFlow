import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <Title>All Workouts</Title>
      {workouts.map((workout) => (
        <Container key={workout.id}>
          <TitleWorkout>
            <Link to={`/workouts/${workout.id}`} style={linkStyle}>{workout.name}</Link>
          </TitleWorkout>
          <TaskList>
            {workout.poses.map((pose) => (
              <PoseContainer key={pose.id}>{pose.name}</PoseContainer>
            ))}
          </TaskList>
        </Container>
      ))}
    </div>
  );
};

export default AllWorkouts;
