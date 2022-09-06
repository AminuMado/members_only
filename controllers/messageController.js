exports.create_message_get = (req, res) => {
  res.render("create_message_form", { title: "Create Message" });
};

exports.create_message_post = (req, res) => {
  res.send(
    `Not implemented: title:${req.body.title} message:${req.body.content}`
  );
};
