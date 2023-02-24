const express = require("express");
const Model = require("../models/models");
const { cart, item, user } = require("../models/models");
const { generateAccessToken, authenticateToken } = require("../jwt");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
    res.json(cart.findOne({ username: req.user.username }, (err, user) => {
        if (err) {

            console.log("error!!!")
            console.log(err);
            res.status(500).send({ message: "Server Error", success: false });
            return;
        } else {

            console.log("here")
        }
    }))

});

router.post("/", authenticateToken, (req, res) => {
    // Check if there is a cart for user
    // if there is, add item into cart.
    // else, then create cart and add item into cart
    const userId = req.user._doc._id;
    const itemId = req.body.itemId;
    console.log(itemId)

    const newcart = new cart({
        username: "kimguan"
    });
    item.findById(itemId, (err, item) => {
        console.log(item)
        newcart.items.push(item)
        newcart.save()
    })


});

module.exports = router;