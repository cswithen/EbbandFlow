const router = require("express").Router();
const { async } = require("regenerator-runtime");
const { Workout, Pose, User, WorkoutPoses } = require("../db/models/index");
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
              exclude: ["updatedAt"],
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

//POST single User create new '/api/workouts/me'
router.post("/me", userCheck, async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const newWorkout = await Workout.create({
      name: "changeName",
    });
    const user = await User.findByPk(userId);

    newWorkout.setUser(user);

    res.json(newWorkout).status(201);
  } catch (error) {
    next(error);
  }
});

//PUT update single users's workout `/api/workouts/:workoutId
router.put("/:workoutId", userCheck, async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const { workoutList } = req.body;
    const { name } = req.body;
    const { spotify } = req.body;
    const responseData = [];

    console.log(req.body.workoutList);

    const workoutVal = await Workout.findByPk(workoutId);
    await workoutVal.update({
      name: name,
      spotifyUrl: spotify,
    });

    workoutList.map(async (pose, index) => {
      const poseId = pose.id;
      const instance = await WorkoutPoses.findOrCreate({
        where: {
          poseId: poseId,
          workoutId: Number(workoutId),
        },
      });
      const instanceAt = instance[0];
      await instanceAt.update({
        poseOrder: index,
      });
      const { dataValues } = await Pose.findByPk(poseId);
      responseData.push(dataValues);
    });
    res.send(responseData);
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
              exclude: ["updatedAt"],
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
