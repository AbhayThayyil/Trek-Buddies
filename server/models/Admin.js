import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
  },
  isAdmin: {
    type: Boolean,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
