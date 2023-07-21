const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getUserRegistration: (req, res) => {
    res.send("User Registration page");
  },

  postUserRegistration: async (req, res) => {
    const {
      firstName,
      lastName,
      phone,
      email,
      gender,
      password,
      cpassword,
      dob,
    } = req.body;

    // Check if the user is already registered
    const userAlreadyRegistered = await User.findOne({
      $or: [{ email: email }], //{ phone: phone }
    });
    // If registered
    if (userAlreadyRegistered) {
      return res.status(404).json({ error: "User already exists" });
    }
    // If not registered
    // if password and cpassword do not match
    if (password !== cpassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        phone,
        email,
        gender,
        password: hashedPassword,
        dob,
      });
      await user.save();
      return res.status(201).json({ message: "User registered", user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getUserLogin: (req, res) => {
    res.send("User login page");
  },

  postUserLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if user exists in DB
      console.log(req.body, "passed from frontend");
      const user = await User.findOne({ email });
      if (user) {
        // Exists,check password
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
          // token
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.TOKEN_SECRET_KEY
          );
          return res.cookie("access_token",token,{httpOnly:true}).status(200).json({
            userExists: true,
            user,
            message: "User logged in successfully",
          });
        }
        return res
          .status(401)
          .json({ error: "Please enter the correct password" });
      }
      // Not exist
      res.status(404).json({ error: "No user found" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  /* Admin Auth  */
  getAdminLogin: (req, res) => {
    res.send("Admin Login page");
  },

  postAdminLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (admin) {
        if (password === admin.password) {
          return res.status(200).json({
            adminExists: true,
            message: "Admin logged in successfully",
          });
        }
        return res
          .status(401)
          .json({ error: "Please enter the correct password" });
      }
      res.status(404).json({ error: "Invalid credentials" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  userLogout:(req,res)=>{
    return res.clearCookie("access_token").status(200).json({message:"Successfully Logged Out !"})
  }
};
