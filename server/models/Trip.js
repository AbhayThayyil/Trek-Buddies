import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    tripName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tripMates: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    tripLocation: {
      type: String,
      default: "",
      required: true,
    },
    tripDate: {
      type: Date,
      required: true,
    },
    joinRequests: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
