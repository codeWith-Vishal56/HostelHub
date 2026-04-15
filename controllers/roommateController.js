const Roommate = require("../models/Roommate");

module.exports.index = async (req, res) => {
  const posts = await Roommate.find({}).populate("createdBy");

  res.render("roommates/index", { posts });
};

module.exports.newForm = (req, res) => {
  res.render("roommates/new");
};

module.exports.createPost = async (req, res) => {
  const post = new Roommate(req.body);

  post.createdBy = req.user._id;

  await post.save();

  req.flash("success", "Roommate post created");

  res.redirect("/roommates");
};
