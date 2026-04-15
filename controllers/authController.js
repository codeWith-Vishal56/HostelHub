const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.showRegister = (req, res) => {
  res.render("auth/register");
};

module.exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hash,
    role,
  });

  await user.save();

  req.flash("success", "Account created successfully");

  res.redirect("/login");
};

module.exports.showLogin = (req, res) => {
  res.render("auth/login");
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged out");

    res.redirect("/");
  });
};
