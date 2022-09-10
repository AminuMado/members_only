const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res, next) => {
  res.render("message_form", {
    title: "Create a Message",
    user: res.locals.currentUser,
  });
};

exports.create_message_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title must not be empty"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content must not be empty"),

  //Process request after validation and sanitization

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message_form", {
        title: "Create a Message",
        user: res.locals.currentUser,
        errors: errors.array(),
      });
    }
    if (!res.locals.currentUser) return res.redirect("/create-message");
    const message = new Message({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      timestamp: Date.now(),
    });

    message.save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  },
];
exports.delete_message_get = async (req, res, next) => {
  try {
    // Find the message on the db
    const message = await Message.findById(req.params.id).populate("user");
    res.render("message_delete", { user: res.locals.currentUser, message });
  } catch (err) {
    return next(err);
  }
};
exports.delete_message_post = async (req, res, next) => {
  try {
    if (!res.locals.currentUser) return res.redirect("/");
    // Remove the message using the id from the database
    await Message.findByIdAndRemove(req.body.messageId);
    // Success... Message has been deleted, go to homepage
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};
