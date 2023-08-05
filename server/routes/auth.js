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

router.get("/logout",userLogout)


router.get("/test",authorization,(req,res)=>{
    console.log(req.userId,req.email);
    const user={
        id:req.userId,
        email:req.email
    }
    res.status(200).json({user,message:"Test Success"})
})

module.exports = router;
