const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(authRoutes);

const mongoURI =
  "mongodb+srv://admin:passwordpassword@clusters.phmyucu.mongodb.net/";

mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting mongo", err);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
