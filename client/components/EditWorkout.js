import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EditWorkout = ({ match }) => {
  const workoutId = +match.params.workoutId;

  console.log(workoutId);

  const [workout, setWorkout] = useState({});
  const [workoutList, setWorkoutList] = useState([]);

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    const fetchWorkout = async () => {
      try {
        const { data } = await axios.get(`/api/workouts/${workoutId}`);
        setWorkout(data);
        setWorkoutList(data.poses);
      } catch (error) {
        console.error(error);
      }
    };
    if (isMounted) fetchWorkout();

    return () => {
      isMounted = false;
    };
  }, []);

  if (workoutList.id) {
    workoutList.sort(
      (firstPose, secondPose) =>
        firstPose.workout_poses.poseOrder - secondPose.workout_poses.poseOrder
    );
  }

  const onDragEnd = (result) => {};

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1>{workout.name}</h1>
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
    </div>
  );
};

export default EditWorkout;
