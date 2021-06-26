const router = require("express").Router();
const { User } = require('../db/models')
const {adminCheck, userCheck} = require ('./authentication/authentication')

//GET all users  '/api/users/'
router.get('/', adminCheck, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    })
    if(!users) {
      return res.status(404).send("Users not found in database")
    }
    return res.json(users)
  } catch (error) {
    next(error)
  }
})

//GET one user '/api/users/:userId
router.get("/:userId", userCheck, async (req, res, next) => {
  try {
    const {userId} = req.params
    const user = await User.findByPk( userId, {
      include: []
    })
    if(!user) {
      return res.status(404).send("User not found in database")
    }
    return res.json(user)
  } catch (error) {
    next(error)
  }
});

// POST create new user '/api/users'
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await User.create(data)

    return res.status(201).json(dataValues)
  } catch (error) {
    next (error)
  }
})

module.exports = router;
