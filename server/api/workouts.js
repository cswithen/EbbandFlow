const router = require("express").Router();
const { Workout, Pose } = require("../db/models/index");

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

//GET one Workout /api/workout/:workoutId
router.get("/:workoutId", async (req, res, next) => {
  try {
    const {workoutId} = req.params;
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
    } )
    if(!workout) {
      return res.status(404).send("Workout not found in database")
    }
    return res.json(workout)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
