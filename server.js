const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://chukimguan:maple123@cluster0.0s9gklj.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/", routes);

const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
