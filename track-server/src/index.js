require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

// add above routes because first parse the body then send data to routes
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = "";

mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting mongo", err);
});

// req to access check valid token by calling auth valid -> give access
app.get("/", requireAuth, (req, res) => {
  res.send(`your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
