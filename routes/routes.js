const mongoose = require("mongoose");
const express = require("express");
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
      newUser.save();
      res.status(200).send({ message: "User Created", success: true });
    }
  });
});

module.exports = router;
