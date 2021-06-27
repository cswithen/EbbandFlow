const router = require("express").Router();
const { async } = require("regenerator-runtime");
const { Workout, Pose, User } = require("../db/models/index");
const { userCheck } = require("./authentication/authentication");

//GET all workouts '/api/workouts/'
router.get("/", async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Pose,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: {
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      ],
    });
    if (!workouts) {
      return res.status(404).send("Workouts not found in database");
    }
    return res.json(workouts);
  } catch (error) {
    next(error);
  }
});

//GET single user's Workouts '/api/workouts/me'
router.get("/me", userCheck, async (req, res, next) => {
  try {
    const userId = req.session.passport.user;

    const workouts = await Workout.findAll({
      where: {
        userId: userId,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Pose,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: {
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      ],
    });

    return res.json(workouts);
  } catch (error) {
    next(error);
  }
});

//GET one Workout /api/workout/:workoutId
router.get("/:workoutId", async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findByPk(workoutId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Pose,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: {
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      ],
    });
    if (!workout) {
      return res.status(404).send("Workout not found in database");
    }
    return res.json(workout);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
