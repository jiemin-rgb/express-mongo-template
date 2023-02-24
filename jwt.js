const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign({ ...user }, TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //IF there is header, then split. Otherwise gives undefined

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log("Error:", err);

    if (err) return res.sendStatus(403);

    // If we have a valid token, we save this user in req.
    req.user = user;

    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };