const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.jwt,"jwt in cookie");
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  console.log(foundUser,"user found using refresh token");
  if (!foundUser) return res.status(403).json("Forbidden");
  // evaluate jwt and create new access token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // console.log(decoded,"decoded check");
    if (err || foundUser.email !== decoded.email)
      return res.status(403).json("Invalid Token");
    const accessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    console.log(accessToken,"new access token generated");
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
