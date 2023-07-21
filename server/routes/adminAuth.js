const router = require("express").Router();
const {
  getAdminLogin,
  postAdminLogin,
} = require("../controllers/auth-controller");
const Admin = require("../models/Admin");

// ADMIN LOGIN

router.get("/login", getAdminLogin);

router.post("/login", postAdminLogin);

module.exports = router;
