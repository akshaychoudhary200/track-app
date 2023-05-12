const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = (req, res, next) => {
  // get auth token from req header
  // authorisation == 'Bearer token'
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "user not logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.token(401).send({ error: "user not logged in" });
    }
    const { userId } = payload;
    // mongoose will be called on User to find the user with given id
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
