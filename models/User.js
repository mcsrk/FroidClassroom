const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id_user: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  classrooms: { type: [String], required: false },
});

module.exports = mongoose.model("User", UserSchema);
