const express = require("express");
const router = express.Router();

router.post("/signup", (rq, res) => {
  res.send("signup request");
});

module.exports = router;
