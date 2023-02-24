const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

const itemSchema = new mongoose.Schema({
    item: String
})

const Item = mongoose.model("Item", itemSchema);

const cartSchema = new mongoose.Schema({
    username: String,
    items: {
        type: [itemSchema],
        default: []
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
    user: User,
    item: Item,
    cart: Cart,
};