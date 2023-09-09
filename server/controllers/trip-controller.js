import User from "../models/User.js";
import Trip from "../models/Trip.js";
import bcrypt from "bcrypt";

import { authorization } from "../middlewares/auth.js";

export const createTrip = async (req, res) => {
  const newTrip = new Trip(req.body);
  try {
    const savedTrip = await newTrip.save();
    res.status(200).json({ savedTrip, message: "Trip created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getAllTrips = async (req, res) => {};
