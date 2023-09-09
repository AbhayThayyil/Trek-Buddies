import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader, "auth header check");
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json("Unauthorized"); //
    // console.log(authHeader, "bearer token"); //Bearer Token

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json("Invalid Token");
      console.log(decoded.userId, "=============decoded id =======");
      req.userId = decoded.userId
      req.email = decoded.email;
      //  console.log("before next");
       console.log(req.userId,req.email,'credentials');
      next();
      // console.log("after next");
    });
  } catch (err) {
    // console.log("CATch WORKING");
    res.status(401).json("Invalid request");
  }
};

