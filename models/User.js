const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id_user: { type: String, required: [true, "user needs the personal id"] },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classrooms: { type: [String], required: false },
  rol_professor: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
