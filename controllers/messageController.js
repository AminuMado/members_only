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

exports.delete_message_post = (req, res, next) => {
  // Remove the message using the id from the database
  Message.findByIdAndRemove(req.body.messageId, function deleteMessage(err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
