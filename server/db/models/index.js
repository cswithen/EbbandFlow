const db = require('../db')
const Sequelize = require('sequelize')

const User = require('./user')
const Pose = require('./poses')
const Workout = require('./workouts')

const WorkoutPoses = db.define('workout_poses', {
  poseOrder: {
    type: Sequelize.INTEGER,
  }
})

User.hasMany(Workout)
Workout.belongsTo(User)

Pose.belongsToMany(Workout, {through: WorkoutPoses})
Workout.belongsToMany(Pose, {through: WorkoutPoses})


module.exports = {
  User,
  Pose,
  Workout,
  WorkoutPoses
}
