// const { getAllTrips, createTrip } = require("../controllers/trip-controller");

// const router = require("express").Router();

// // Get all trips
// router.get('/',getAllTrips)

// // Create a trip
// router.post('/',createTrip)

// module.exports = router;

import { getAllTrips, createTrip } from "../controllers/trip-controller.js";
import { Router } from "express";

const router = Router();

// Get all trips
router.get("/", getAllTrips);

// Create a trip
router.post("/", createTrip);

export default router;
