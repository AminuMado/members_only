var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const profileController = require("../controllers/profileController");
/**
 * -------------- POST ROUTES ----------------
 */
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.post("/create-message", messageController.create_message_post);
router.post("/profile", profileController.profile_post);

/**
 * -------------- GET ROUTES ----------------
 */

/* Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only" });
});

/* Sign Up Page. */
router.get("/signup", authController.signup_get);

/* Log In Page. */
router.get("/login", authController.login_get);

/* Profile Page. */
router.get("/profile", profileController.profile_get);

/* Create Message Page. */
router.get("/create-message", messageController.create_message_get);

/* Log Out. */
router.get("/logout", authController.logout_get);

module.exports = router;
