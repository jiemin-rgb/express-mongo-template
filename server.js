const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const cartRoutes = require("./routes/cart");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//Connecting to database
mongoose.set("strictQuery", false);
const url = process.env.MONGOLAB_URI;
mongoose.connect(url);

//Routes
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/cart", cartRoutes);

const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));