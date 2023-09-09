import express from "express";
import cookieParser from "cookie-parser";
const app = express();

import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors/corsOptions.js";
import morgan from "morgan";
import { mongooseConnection } from "./config/database.js";
import multer from "multer";
import { credentials } from "./middlewares/credentials.js";


// to be used just before cors
app.use(credentials);
// CORS

app.use(cors(corsOptions));

//setting path to access image from public folder
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "public/images")));



import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import adminAuthRoute from './routes/adminAuth.js';
import postRoute from './routes/posts.js';
import tripRoute from './routes/trip.js';
import refreshRoute from './routes/refresh.js';
import adminRoute from './routes/admin.js';

dotenv.config();

mongooseConnection();

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

//Serve static files
// app.use(express.static(path.join(__dirname, "/public")));

//api addresses

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/adminAuth", adminAuthRoute);
app.use("/api/posts", postRoute);
app.use("/api/trip", tripRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/admin", adminRoute);

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port} !`);
});
