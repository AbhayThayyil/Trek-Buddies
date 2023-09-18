import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      minlength: [3, "Username should contain atleast 3 character"],
      maxlength: [20, "Username should contain atmost 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      minlength: [3, "Username should contain atleast 3 character"],
      maxlength: [20, "Username should contain atmost 20 characters"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter a phone number"],
      validate: {
        validator: (value) => {
          return /^[0-9]{10}$/.test(value);
        },
        message: "Phone number must have exactly 10 digits",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    dob: {
      type: Date,
      // required: [true, "Please enter your Date of Birth"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Please enter your gender"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blocked: {
      type: Boolean,
      default: false,
    },

    story: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],

    dreamSpots: [
      {
        locationName: {
          type: String,
        },
      },
    ],
    travelMates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: {
      type: String,
      default: "",
    },
    profilePictureURL: {
      type: String,
      default: "",
    },
    coverPictureURL: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
