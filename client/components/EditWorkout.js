import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PosesContext } from "../contexts/posesContext";

const EditWorkout = ({ match }) => {
  const workoutId = +match.params.workoutId;

  const [workout, setWorkout] = useState({});
  const [workoutList, setWorkoutList] = useState([]);
  const [toggle, setToggle] = useState(true);

  const { poses } = useContext(PosesContext);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    const fetchWorkout = async () => {
      try {
        const { data } = await axios.get(`/api/workouts/${workoutId}`);
        setWorkout(data);
        const poses = data.poses;
        poses.sort(
          (firstPose, secondPose) =>
            firstPose.workout_poses.poseOrder -
            secondPose.workout_poses.poseOrder
        );
        setWorkoutList(poses);
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
    await axios.put(`/api/workouts/${workoutId}`, workoutList);
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

    await axios.put(`/api/workouts/${workoutId}`, [poses[idx]]);

    tempWorkoutList.push(poses[idx]);
    setWorkoutList(tempWorkoutList);
    setToggle(!toggle);
  };

  return (
    <div>
      <h1>{workout.name}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {workoutList.map((pose, index) => (
                <Draggable key={pose.id} draggableId={pose.name} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={pose.id}
                    >
                      {pose.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSubmit}>Submit</button>
      <h2>Add Some More </h2>
      {poses.map((pose) => (
        <button key={pose.id} name={pose.name} onClick={handleClick}>
          {pose.name}
        </button>
      ))}
    </div>
  );
};

export default EditWorkout;
