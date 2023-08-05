const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader,"auth header check");
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json("Unauthorized"); // 
  // console.log(authHeader, "bearer token"); //Bearer Token

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid Token");
    // console.log(decoded.userId,"=============decoded id =======");
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  });
};

module.exports = { authorization };
