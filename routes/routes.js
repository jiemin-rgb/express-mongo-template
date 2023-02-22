const express = require("express");
const { generateAccessToken, authenticateToken } = require("../jwt");
const Model = require("../models/models");
const router = express.Router();

router.post("/signup", (req, res) => {
  const User = Model.user;

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error", success: false });
      return;
    }
    if (user) {
      res.status(400).send({ message: "User Already Exists", success: false });
    } else {
      const newUser = new User(req.body);

      const token = generateAccessToken(newUser);
      newUser.save();
      res
        .status(200)
        .send({ message: "User Created", success: true, token: token });
    }
  });
});

router.get("/get_item", authenticateToken, (req, res) => {
  // FROM the GET request
  const username = req.query.username;

  // FROM the authentication token
  const username_token = req.user.user.username;

  if (username === username_token) {
    res.send("OK");
  } else {
    res.send("not OK");
  }
});

module.exports = router;
