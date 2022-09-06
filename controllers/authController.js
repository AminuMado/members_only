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
exports.signup_post = (req, res) => {
  res.send(
    `Not Implemented: username:${req.body.username} password:${req.body.password} avatar:${req.body.avatar}`
  );
};
