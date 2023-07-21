const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    return next();
  } catch (err) {
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports={authorization}
