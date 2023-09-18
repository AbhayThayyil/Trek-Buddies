import User from "../models/User.js";
import Trip from "../models/Trip.js";
import bcrypt from "bcrypt";

import { authorization } from "../middlewares/auth.js";
import { ObjectId } from "mongodb";

export const createTrip = async (req, res) => {
  console.log(req.body, "req.body");

  const tripDate = new Date(req.body.tripDate);
  const expireAt = new Date(tripDate.getTime() + 3600 * 1000); // Adding 1 hr to trip date day to expire

  Trip.createIndexes({ expireAt: 1 }, { expireAfterSeconds: 3600 });

  const newTrip = new Trip(req.body);
  newTrip.expireAt = expireAt;
  newTrip.createdBy = req.userId;
  // newTrip.tripMates.push(req.userId)          // add this if needed
  // console.log(newTrip, "trip");
  try {
    const savedTrip = await newTrip.save();
    res.status(200).json({ savedTrip, message: "Trip created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .populate({
        path: "tripMates",
        model: "User",
      });
    // console.log(trips, "trips chk");
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const dropATrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;

    // console.log(tripId, "tripid chk");

    const tripToDelete = await Trip.findById(tripId);

    console.log(tripToDelete, "check the one to delete");

    if (!tripToDelete) {
      return res.status(404).json({ error: "Trip not found" });
    }

    console.log(req.userId, "id chk");
    console.log(tripToDelete.createdBy, "created by ");
    if (tripToDelete.createdBy.toString() === req.userId) {
      console.log("true");
      await tripToDelete.deleteOne();
      return res
        .status(200)
        .json({ message: "Trip deleted successfully", tripToDelete });
    } else {
      return res.status(403).json({ error: "You cannot delete other's Trip" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinATrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const tripToJoin = await Trip.findById(tripId);

    console.log(tripToJoin, "trip to join");

    if (!tripToJoin) {
      return res.status(404).json({ error: "Trip not found" });
    }

    if (tripToJoin.createdBy.toString() !== req.userId) {
      if (tripToJoin.tripMates.includes(req.userId)) {
        return res.status(400).json({ error: "You already joined the trip" });
      } else {
        tripToJoin.tripMates.push(new ObjectId(req.userId));
        await tripToJoin.save();
        return res.status(200).json({
          message: "Joined Trip successfully",
          userId: req.userId,
          tripId,
        });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const leaveATrip = async (req, res) => {
  try {
    const tripId = req.params.tripId;
    const tripToLeave = await Trip.findById(tripId);

    if (!tripToLeave) {
      return res.status(404).json({ error: "Trip not found" });
    }

    if (tripToLeave.createdBy.toString() !== req.userId) {
      if (!tripToLeave.tripMates.includes(req.userId)) {
        return res.status(400).json({ error: "You are not in this trip" });
      } else {
        tripToLeave.tripMates = tripToLeave.tripMates.filter(
          (userId) => userId.toString() !== req.userId
        );
        await tripToLeave.save();
        return res.status(200).json({
          message: "Left Trip successfully",
          userId: req.userId,
          tripId,
        });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
