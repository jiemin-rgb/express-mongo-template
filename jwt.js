const jwt = require("jsonwebtoken");

const TOKEN_SECRET =
  "4b73745e18173c42d7f372f23bce8549ad6bd5108c55dc3f885f4405bff016ea864a6a664d399916569f20d10389ca7531a1411a548a067646a46b4cdd41d571";

const generateAccessToken = (user) => {
  return jwt.sign({ user }, TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log("Error:", err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
