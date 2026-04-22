const FriendProfile = require("../models/FriendProfile");
const FriendRequest = require("../models/FriendRequest");

// 🔹 Show users in same city
module.exports.index = async (req, res) => {
  const currentUserProfile = await FriendProfile.findOne({
    userId: req.user._id,
  });

  if (!currentUserProfile) {
    req.flash("error", "Create your profile first");
    return res.redirect("/friends/new");
  }

  const users = await FriendProfile.find({
    city: currentUserProfile.city,
    userId: { $ne: req.user._id },
  }).populate("userId");

  res.render("friends/index", { users });
};

// 🔹 Create profile form
module.exports.newForm = (req, res) => {
  res.render("friends/new");
};

// 🔹 Create profile
module.exports.createProfile = async (req, res) => {
  const profile = new FriendProfile(req.body);

  profile.userId = req.user._id;

  // convert interests string → array
  if (typeof req.body.interests === "string") {
    profile.interests = req.body.interests.split(",");
  }

  await profile.save();

  req.flash("success", "Profile created");

  res.redirect("/friends");
};

// 🔹 Filter by interest
module.exports.filterByInterest = async (req, res) => {
  const { interest } = req.params;

  const users = await FriendProfile.find({
    interests: interest,
  }).populate("userId");

  res.render("friends/index", { users });
};

// 🔹 Send request
module.exports.sendRequest = async (req, res) => {
  const { id } = req.params;

  const request = new FriendRequest({
    sender: req.user._id,
    receiver: id,
  });

  await request.save();

  req.flash("success", "Friend request sent");

  res.redirect("/friends");
};

// 🔹 Accept request
module.exports.acceptRequest = async (req, res) => {
  const { id } = req.params;

  const request = await FriendRequest.findById(id);

  request.status = "accepted";

  await request.save();

  req.flash("success", "Friend request accepted");

  res.redirect("/friends");
};
