import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PosesContext } from "../contexts/posesContext";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#639cbf" : "#f2ebec"};
`;

const PoseContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  background-color: ${(props) => (props.isDragging ? "#d99379" : "#f2ebec")};
`;

const Button = styled.button`
background: ${props => props.primary ? '#639cbf' : '#d99379' };
color: ${props => props.primary ? '#f2ebec' : '#1e403c' };

font-size: 1em;
margin: 0.25em;
padding: 0.25em 0.25em;
border: 0px solid ${props => props.primary ? '#f2ebec' : '' };
border-radius: 3px;
`

const EditWorkout = ({ match }) => {
  const workoutId = +match.params.workoutId;

  const [workout, setWorkout] = useState({});
  const [workoutList, setWorkoutList] = useState([]);

  const [name, setName] = useState("");
  const [spotify, setSpotify] = useState("");

  const [toggle, setToggle] = useState(true);

  const { poses } = useContext(PosesContext);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    const fetchWorkout = async () => {
      try {
        const { data } = await axios.get(`/api/workouts/${workoutId}`);
        setWorkout(data);

        const name = data.name;
        const spotify = data.spotifyUrl;
        const poses = data.poses;
        poses.sort(
          (firstPose, secondPose) =>
            firstPose.workout_poses.poseOrder -
            secondPose.workout_poses.poseOrder
        );
        setWorkoutList(poses);
        setName(name);
        setSpotify(spotify);
      } catch (error) {
        console.error(error);
      }
    };
    if (isMounted) fetchWorkout();

    return () => {
      isMounted = false;
    };
  }, [toggle]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    function getIndexOf(array, value) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === value) {
          return i;
        }
      }
      return -1;
    }

    const tempWorkoutList = workoutList;
    const poseIdx = getIndexOf(tempWorkoutList, draggableId);
    const intermediate = tempWorkoutList[poseIdx];

    tempWorkoutList.splice(source.index, 1);
    tempWorkoutList.splice(destination.index, 0, intermediate);

    setWorkoutList(tempWorkoutList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`/api/workouts/${workoutId}`, {
      name,
      spotify,
      workoutList,
    });
    setToggle(!toggle);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const tempWorkoutList = workoutList;

    function getIndexOf(array, value) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === value) {
          return i;
        }
      }
      return -1;
    }
    const idx = getIndexOf(poses, event.target.name);

    await axios.put(`/api/workouts/${workoutId}`, {
      name,
      spotify,
      workoutList: [poses[idx]],
    });

    const intermediate = poses[idx];

    tempWorkoutList.push(intermediate);
    setWorkoutList(tempWorkoutList);
    setToggle(!toggle);
  };

  return (
    <div>
      <section>
        <form>
          <div>
            <label htmlFor="sequenceName">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="spotifyUrl">Spotify Url</label>
            <input
              type="text"
              value={spotify}
              onChange={(event) => setSpotify(event.target.value)}
            />
          </div>
        </form>
        <Container>
          <Title>{workout.name}</Title>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {workoutList.map((pose, index) => (
                    <Draggable
                      key={pose.id}
                      draggableId={pose.name}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <PoseContainer
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          isDragging={snapshot.isDragging}
                          key={pose.id}
                        >
                          {index + 1}
                          {". "}
                          {pose.name}
                        </PoseContainer>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
        <Button type="submit" onClick={handleSubmit} primary>
          Submit
        </Button>
        <h2>Add Some More </h2>
        {poses.map((pose) => (
          <Button key={pose.id} name={pose.name} onClick={handleClick}>
            {pose.name}
          </Button>
        ))}
      </section>
    </div>
  );
};

export default EditWorkout;
