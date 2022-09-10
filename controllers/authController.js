const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

/* Log In. */

exports.login_get = (req, res) => {
  res.render("login_form", { title: "Login", user: res.locals.currentUser });
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

/* Log Out. */

exports.logout_get = (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};

/* Sign Up */

exports.signup_get = (req, res) => {
  res.render("signup_form", { title: "Sign Up", user: res.locals.currentUser });
};

exports.signup_post = [
  // Validate and sanitize fields
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("username must be at least 3 characters"),
  body("avatar").escape().notEmpty().withMessage("select an avatar"),
  body("password")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("password must be at least 3 characters"),
  body("confirmPassword")
    .notEmpty()
    .isLength({ min: 3 })
    .escape()
    .withMessage("password must be at least 3 characters")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Password confirmation does not match with password"),

  //Process request after validation and sanitization
  async (req, res, next) => {
    if (res.locals.currentUser) return res.redirect("/signup");

    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup_form", {
        errors: errors.array(),
        title: "Sign Up",
        user: res.locals.currentUser,
      });
    }
    // Check if the username from the request is in the database.
    const takenUsername = await User.find({ username: req.body.username });
    if (takenUsername.length > 0) {
      return res.render("signup_form", {
        errors: [{ msg: "username already taken" }],
        title: "Sign Up",
      });
    }
    // Everything is good we can proceed to hash and salt the given password and create a new user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create a new user with trimmed and sanitized data;
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      avatar: req.body.avatar,
    });
    // we can save the newly created user in our database
    user.save((err) => {
      if (err) return next(err);
      res.redirect("/login");
    });
  },
];
