const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  id_student: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classrooms: { type: [String], required: false },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
