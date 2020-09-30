const express = require("express");
const router = express.Router();
const User = require("../models/User");

//GET ALL
router.get("/", async (req, res) => {
  try {
    const theUsers = await User.find();
    res.json(theUsers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/index", (req, res) => {
  res.send("we are in the classroom index");
});

//GET {index}

router.get("/:userId", async (req, res) => {
  try {
    const theUser = await User.findById(req.params.userId);
    res.json(theUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//POST
router.post("/", async (req, res) => {
  const user = new User({
    id_user: req.body.id_user,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    classrooms: req.body.classrooms,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: error });
  }
});

//DELETE {index}
router.delete("/:userId", async (req, res) => {
  try {
    const revomovedUser = await User.remove({
      _id: req.params.userId,
    });
    res.json(revomovedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      {
        _id: req.params.userId,
      },
      {
        $set: {
          id_user: req.body.id_user,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          classrooms: req.body.classrooms,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
