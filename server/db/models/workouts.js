const Sequelize = require('sequelize')
const db = require("../db")

const Workout = db.define("workouts", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  spotifyUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ""
  }
})

module.exports = Workout
