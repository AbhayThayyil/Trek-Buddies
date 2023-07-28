const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = require("./config/cors/corsOptions");
const morgan = require("morgan");
const mongooseConnection = require("./config/database");

const { credentials } = require("./middlewares/credentials");

// to be used just before cors
app.use(credentials);
// CORS

app.use(cors(corsOptions));

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const adminAuthRoute = require("./routes/adminAuth");
const postRoute = require("./routes/posts");
const refreshRoute = require("./routes/refresh");

dotenv.config();

mongooseConnection();

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

//Serve static files
app.use(express.static(path.join(__dirname, "/public")));

//api addresses

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/adminAuth", adminAuthRoute);
app.use("/api/posts", postRoute);
app.use("/api/refresh", refreshRoute);

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port} !`);
});
