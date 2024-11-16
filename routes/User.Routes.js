const {
  Signup,
  Login,
  Logout,
  userVerification,
} = require("../controllers/Auth.Controllers");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/", userVerification);

module.exports = router;
