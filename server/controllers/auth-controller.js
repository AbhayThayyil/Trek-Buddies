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
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        // Exists,check password
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (passwordMatch) {
          // token
          const accessToken = jwt.sign(
            { userId: foundUser._id, email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
          );
          const refreshToken = jwt.sign(
            { userId: foundUser._id, email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          // Saving Refresh Token with the Current User
          foundUser.refreshToken = refreshToken;
          const result=await foundUser.save();
          console.log(result);

          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.status(200).json({
            userExists: true,
            result,
            message: "User logged in successfully",
            accessToken,
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

  userLogout: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // Check if refresh Token is in DB
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    //Delete the refresh Token in DB
    foundUser.refreshToken = "";
    await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true,sameSite: "None", secure: true   });  //  
    return res.status(204).json("Logged out successfully");
  },
};
