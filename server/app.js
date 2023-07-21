const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongooseConnection = require("./config/database");
app.use(cors());

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const adminAuthRoute = require("./routes/adminAuth");
const postRoute=require("./routes/posts")

dotenv.config();

mongooseConnection();

//middleware

app.use(express.json());
app.use(cookieParser())
app.use(helmet());
app.use(morgan("common"));

//api addresses

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/adminAuth", adminAuthRoute);
app.use("/api/posts",postRoute)


app.get('/message',(req,res)=>{
  res.json({message:"Hello from server"})
})

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port} !`);
});
