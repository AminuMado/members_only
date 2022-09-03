var express = require("express");
var router = express.Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */

/* Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Members Only" });
});

/* Sign Up Page. */
router.get("/signup", function (req, res, next) {
  res.render("signup_form", { title: "Sign Up" });
});

/* Log In Page. */
router.get("/login", function (req, res, next) {
  res.render("login_form", { title: "Login" });
});

/* Profile Page. */
router.get("/profile", function (req, res, next) {
  res.render("profile", { title: "Profile" });
});

/* Create Message Page. */
router.get("/create-message", function (req, res, next) {
  res.render("create_message_form", { title: "Create Message" });
});

module.exports = router;
