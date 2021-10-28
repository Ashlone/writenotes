const router = require("express").Router();
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const {
  registerUser,
  loggingInUser,
  updateUserProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loggingInUser);
router.post("/profile", verifyToken, updateUserProfile);

module.exports = router;
