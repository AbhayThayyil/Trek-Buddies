const { getUserRegistration, postUserRegistration, getUserLogin, postUserLogin, userLogout } = require("../controllers/auth-controller");
const { authorization } = require("../middlewares/auth");

const router = require("express").Router();



// USER REGISTER

router.get("/register", getUserRegistration);

router.post("/register", postUserRegistration);

// USER LOGIN

router.get("/login", getUserLogin);

router.post("/login", postUserLogin);

// USER LOGOUT

router.get("/logout",authorization,userLogout)

module.exports = router;
