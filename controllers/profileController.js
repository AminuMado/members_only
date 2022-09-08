const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.profile_get = (req, res) => {
  res.render("profile", { title: "Profile", user: res.locals.currentUser });
};

exports.profile_post = [
  // Validate and sanitize field
  body("avatar").escape().notEmpty().withMessage("select an avatar"),
  body("secretPassword")
    .notEmpty()
    .escape()
    .withMessage("Enter secret Password")
    .custom((value) => {
      if (value === process.env.SECRET) {
        return true;
      }
      return false;
    })
    .withMessage("Enter the correct secret password"),

  //Process request after validation and sanitization

  async (req, res, next) => {
    try {
      // Extract the validation errors from a request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("profile", {
          errors: errors.array(),
          title: "Profile",
          user: res.locals.currentUser,
        });
      }
      const isMember = req.body.isMember ? true : false;
      const isAdmin = req.body.isAdmin ? true : false;
      const filter = { _id: req.body.userId };
      const update = {
        member: isMember,
        admin: isAdmin,
        avatar: req.body.avatar,
      };
      await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      // Success... User has been updated, go to homepage
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
