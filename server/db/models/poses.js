const Sequelize = require("sequelize");
const db = require("../db")

const Pose = db.define("poses", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nameSanskrit: {
    type: Sequelize.STRING,
  }
})

module.exports = Pose;

