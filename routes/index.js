var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const profileController = require("../controllers/profileController");
const indexController = require("../controllers/indexController");
/**
 * -------------- POST ROUTES ----------------
 */
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.post("/create-message", messageController.create_message_post);
router.post("/profile", profileController.profile_post);
router.post("/message/:id/delete", messageController.delete_message_post);

/**
 * -------------- GET ROUTES ----------------
 */

/* Home page. */
router.get("/", indexController.index);

/* Sign Up Page. */
router.get("/signup", authController.signup_get);

/* Log In Page. */
router.get("/login", authController.login_get);

/* Profile Page. */
router.get("/profile", profileController.profile_get);

/* Create Message Page. */
router.get("/create-message", messageController.create_message_get);

/* Delete Message Page. */
router.get("/message/:id/delete", messageController.delete_message_get);

/* Log Out. */
router.get("/logout", authController.logout_get);

module.exports = router;
