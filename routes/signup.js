const express = require("express");
const Model = require("../models/models");
const { generateAccessToken, authenticateToken } = require("../jwt");
const router = express.Router();
const md5 = require("md5"); //For Hashing password

router.post("/", (req, res) => {
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
            const newUser = new User({
                username: req.body.username,
                password: md5(req.body.password)
            });

            const token = generateAccessToken(newUser);

            newUser.save();
            res
                .status(200)
                .send({ message: "User Created", success: true, token: token });
        }
    });
});

module.exports = router;