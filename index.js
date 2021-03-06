const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

app.use(bodyParser.json());

//imp routes
const classroomsRoute = require("./routes/classrooms");
const usersRoute = require("./routes/users");

app.use("/classroom", classroomsRoute);
app.use("/user", usersRoute);

//routes
app.get("/", (req, res) => {
  res.send("routes: /classroom /user");
});
//error handling middleware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({ error: err.message });
});
//conect db
mongoose.connect(
  "mongodb+srv://developer:bigj@classes-api.sajur.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  () => console.log("we are on db")
);

//starting
app.listen(3000, "0.0.0.0");

console.log("Server's ON at localhost:3000");
