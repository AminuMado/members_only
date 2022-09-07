exports.profile_get = (req, res) => {
  res.render("profile", { title: "Profile", user: res.locals.currentUser });
};

exports.profile_post = (req, res) => {
  res.send(
    `Not Implemented: avatar:${req.body.avatar} isMember:${req.body.isMember} isAdmin:${req.body.isAdmin} secretPassword:${req.body.secretPassword}`
  );
};
