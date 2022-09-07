const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
exports.login_get = (req, res) => {
  res.render("login_form", { title: "Login" });
};
exports.login_post = (req, res) => {
  res.send(
    `Not Implemented: username:${req.body.username} password:${req.body.password}`
  );
};

exports.signup_get = (req, res) => {
  res.render("signup_form", { title: "Sign Up" });
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
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup_form", {
        errors: errors.array(),
        success: [],
        title: "Sign Up",
      });
    }
    // Check if the username from the request is in the database.
    const takenUsername = await User.find({ username: req.body.username });
    if (takenUsername.length > 0) {
      return res.render("signup_form", {
        errors: [{ msg: "username already taken" }],
        success: [],
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
      res.render("signup_form", {
        errors: [],
        success: [{ msg: "You signed up successfully, please log in" }],
      });
    });
  },
];
