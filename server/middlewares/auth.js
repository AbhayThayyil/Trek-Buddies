const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json("Unauthorized");
  console.log(authHeader); //Bearer Token

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid Token");
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  });
};

module.exports = { authorization };
