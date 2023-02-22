const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://chukimguan:maple123@cluster0.0s9gklj.mongodb.net/?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  user: User,
};
