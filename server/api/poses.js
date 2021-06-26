const router = require("express").Router();
const { Pose } = require("../db/models/index");

//GET all poses '/api/poses/'
router.get("/", async (req, res, next) => {
  try {
    const poses = await Pose.findAll({
      attributes: ["id", "name", "nameSanskrit"],
    });
    if (!poses) {
      return res.status(404).send("Poses not found in database");
    }
    return res.json(poses);
  } catch (error) {
    next(error);
  }
});

//GET one pose /api/poses/:poseId
router.get("/:poseId", async (req, res, next) => {
  try {
    const { poseId } = req.params;
    const pose = await Pose.findByPk(poseId);
    if (!pose) {
      return res.status(404).send("Pose not found in database");
    }
    return res.json(pose);
  } catch (error) {
    next(error);
  }
});

module.exports = router
