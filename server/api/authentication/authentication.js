const { User } = require("../../db/models");

const userCheck = async (req, res, next) => {
  if (req.session.passport) {
    const reqId = req.session.passport.user;
    const user = await User.findByPk(reqId);

    if ((user && user.id === reqId) || (user && user.status === "admin")) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

const adminCheck = async (req, res, next) => {
  if (req.session.passport) {
    const reqId = req.session.passport.user;
    const user = await User.findByPk(reqId);

    if (user && user.status === "admin") {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  userCheck,
  adminCheck
}
