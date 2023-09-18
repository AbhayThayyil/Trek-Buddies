// const { getAllTrips, createTrip } = require("../controllers/trip-controller");

// const router = require("express").Router();

// // Get all trips
// router.get('/',getAllTrips)

// // Create a trip
// router.post('/',createTrip)

// module.exports = router;

import {
  getAllTrips,
  createTrip,
  dropATrip,
  joinATrip,
  leaveATrip,
} from "../controllers/trip-controller.js";
import { Router } from "express";
import { authorization } from "../middlewares/auth.js";

const router = Router();

// Get all trips
router.get("/", authorization, getAllTrips);

// Create a trip
router.post("/", authorization, createTrip);

//Delete a trip

router.delete("/:tripId", authorization, dropATrip);

//Join a Trip

router.put("/:tripId", authorization, joinATrip);

// Leave a Trip

router.put("/leave/:tripId", authorization, leaveATrip);

export default router;
