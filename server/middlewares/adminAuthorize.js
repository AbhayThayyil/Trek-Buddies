import jwt from "jsonwebtoken";

 const adminAuthorize = (req, res, next) => {
  try {
    // console.log(req,"header check for admin");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader, "auth header check");
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json("Unauthorized"); //
    // console.log(authHeader, "bearer token"); //Bearer Token

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json("Invalid Token");
      console.log(decoded.adminId, "=============decoded id =======");
      req.role=decoded.role
      req.adminId = decoded.adminId
      req.email = decoded.email;
      //  console.log("before next");
      //  console.log(req.adminId,req.email,req.role,'credentials');
      next();
      // console.log("after next");
    });
  } catch (err) {
    // console.log("CATHC WORKING");
    res.status(401).json("Invalid request");
  }
};

export default adminAuthorize

