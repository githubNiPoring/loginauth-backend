const { Signup, Login, Logout } = require("../controllers/Auth.Controllers");
const userVerification = require("../middlewares/Auth.Middlewares");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/", userVerification);

module.exports = router;
