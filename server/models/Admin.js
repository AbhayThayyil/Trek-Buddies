const mongoose = require("mongoose");

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
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
