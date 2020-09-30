const mongoose = require("mongoose");

const ClassroomSchema = mongoose.Schema({
  id_classroom: { type: String, required: true },
  name: { type: String, required: true },
  teacher: { type: String, required: true },
  room: { type: String, required: true },
  content: { type: String, default: "No hay descripción del aula de clase" },
  students: { type: [String], default: [] },
  comments: [{ body: String, date: Date }],
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
