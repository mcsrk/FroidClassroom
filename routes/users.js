const express = require("express");
const Classroom = require("../models/Classroom");
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
  try {
    let theClassrooms = [req.body.classrooms.length],
      temp;
    //get classrooms ids
    for (let index = 0; index < req.body.classrooms.length; index++) {
      temp = await Classroom.find({
        id_classroom: req.body.classrooms[index],
      }).select("_id");
      theClassrooms[index] = temp[0]._id;
      console.log(theClassrooms[index]);
    }
    const user = new User({
      id_user: req.body.id_user,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      classrooms: theClassrooms,
      rol_professor: req.body.rol_professor,
    });
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
          rol_professor: req.body.rol_professor,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET ALL
router.get("/classrooms/:userId", async (req, res) => {
  try {
    const theUser = await User.findById(req.params.userId);

    let theClassrooms = [theUser.classrooms.length],
      temp;
    //get classrooms ids
    for (let index = 0; index < theUser.classrooms.length; index++) {
      temp = await Classroom.find({
        _id: theUser.classrooms[index],
      });
      theClassrooms[index] = temp;
    }
    res.json(theClassrooms);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
