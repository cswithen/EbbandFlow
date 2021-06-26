const Sequelize = require("sequelize");
const db = require("../db");

const bcrypt = require("bcrypt");


const SALT_ROUNDS = 13;

const User = db.define("users", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  userStatus: {
    type: Sequelize.ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user'
  }
});

module.exports = User;

//instance Methods
User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

//class Methods
const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
