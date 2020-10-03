const express = require("express");
const router = express.Router();
const Classroom = require("../models/Classroom");
const User = require("../models/User");

//GET ALL
router.get("/", async (req, res) => {
  try {
    const theClassrooms = await Classroom.find();
    res.json(theClassrooms);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/index", (req, res) => {
  res.send("we are in the classroom index");
});

//POST
router.post("/", async (req, res) => {
  let theProfessor, professor_id;
  try {
    //obtain the professor id
    theProfessor = await User.find({ id_user: req.body.teacher }).select(
      "id_user rol_professor"
    );
    professor_id = theProfessor[0]._id;
    isProfessor = theProfessor[0].rol_professor;
    //nest the professor id into classroom object
    const classroom = new Classroom({
      id_classroom: req.body.id_classroom,
      name: req.body.name,
      teacher: professor_id,
      room: req.body.room,
      content: req.body.content,
      students: req.body.students,
      comments: req.body.comments,
    });

    const savedClassroom = await classroom.save();
    res.json(savedClassroom);
  } catch (err) {
    res.json({ message: error });
  }
});

//GET {index}

router.get("/:classroomId", async (req, res) => {
  try {
    const theClassroom = await Classroom.findById(req.params.classroomId);
    res.json(theClassroom);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE {index}
router.delete("/:classroomId", async (req, res) => {
  try {
    const revomovedClassroom = await Classroom.remove({
      _id: req.params.classroomId,
    });
    res.json(revomovedClassroom);
  } catch (err) {
    res.json({ message: err });
  }
});

//update classroom
router.put("/:classroomId", async (req, res) => {
  try {
    const updatedClassroom = await Classroom.updateOne(
      {
        _id: req.params.classroomId,
      },
      {
        $set: {
          id_classroom: req.body.id_classroom,
          name: req.body.name,
          teacher: req.body.teacher,
          room: req.body.room,
          content: req.body.content,
          students: req.body.students,
          comments: req.body.comments,
        },
      }
    );
    res.json(updatedClassroom);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
