const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

// log user in auth/login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({where: {username: req.body.username}})
    if(!user) {
      console.log('No such user found:', req.body.username)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.username)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, (error) => (error ? next(error) : res.json(user)))
    }
  } catch (error) {
    next(error);
  }
});

//POST auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (error) => (error ? next(error) : res.json(user)));
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(error);
    }
  }
});

//log user out auth/logout
router.post('/logout', (req,  res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

//GET auth/me
router.get("/me", async (req, res) => {
 res.json(req.user)
});
