const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

app.use(bodyParser.json());

//imp routes
const classroomsRoute = require("./routes/classrooms");

app.use("/classroom", classroomsRoute);

//routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

//conect db
mongoose.connect(
  process.env.DB_CONECTION,
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  () => console.log("we are on db")
);

//starting
app.listen(3000);
